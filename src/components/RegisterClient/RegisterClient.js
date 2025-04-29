import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService, { initialAuthState } from "../Services/ApiServices";
import "./RegisterClient.css";

const RegisterClient = () => {
  const navigate = useNavigate();
  const initialFormData = {
    name: "",
    phoneNumber: "",
    gstNumber: "",
    branch: "",
    dob: "",
    email: "",
    password: "",
    address: "",
    joiningDate: "",
    companyCode: initialAuthState.companyCode,
    unitCode: initialAuthState.unitCode,
    file: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [branches, setBranches] = useState([]);
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(URL.createObjectURL(selectedFile));
      setFormData((prev) => ({ ...prev, file: selectedFile }));
    }
  };

  const validate = (fieldName, value) => {
    let error = "";
    if (value.trim() === "") error = `${fieldName} is required.`;
    if (fieldName === "email" && value && !/\S+@\S+\.\S+/.test(value))
      error = "Please enter a valid email.";
    if (fieldName === "phoneNumber" && value && !/^\d{10}$/.test(value))
      error = "Phone number must be 10 digits.";
    return error;
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validate(name, value),
    }));
  }, []);

  const handleSave = async () => {
    if (errors.email || errors.phoneNumber) {
      alert("Please fix the validation errors before registering.");
      return;
    }
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });
    try {
      const response = await ApiService.post(
        "/client/handleClientDetails",
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.status) {
        alert("Client registered successfully!");
        navigate("/login");
      } else {
        alert("Failed to register. Please try again.");
      }
    } catch (error) {
      console.error("Error saving client details:", error);
      alert("Failed to register. Please try again.");
    }
  };

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await ApiService.post(
          "/branch/getBranchNamesDropDown"
        );
        if (response.status) {
          setBranches(response.data);
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };
    fetchBranches();
  }, []);

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-logo-container">
          <img
            src="/images/logo-square.png"
            alt="logo-square"
            className="register-logo-square"
          />
          <h1 className="register-title">Register</h1>
        </div>

        <div className="image-upload">
          <img
            src={image || "https://i.pravatar.cc/150?img=5"}
            alt="Preview"
            className="profile-img"
          />
          <input
            type="file"
            accept="image/*"
            name="file"
            onChange={handleFileChange}
            className="file-input"
          />
          {formData.file && (
            <button
              className="remove-button"
              onClick={() => {
                setFormData({ ...formData, file: null });
                setImage("");
              }}
            >
              Remove
            </button>
          )}
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Name"
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter Phone Number"
            />
            {errors.phoneNumber && (
              <span className="error">{errors.phoneNumber}</span>
            )}
          </div>

          <div className="form-group">
            <label>Email ID</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>GST Number</label>
            <input
              type="text"
              name="gstNumber"
              value={formData.gstNumber}
              onChange={handleInputChange}
              placeholder="Enter GST Number"
            />
          </div>

          {branches.length > 0 && (
            <div className="form-group">
              <label>Branch</label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
              >
                <option value="">Select a Branch</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.branchName}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group">
            <label>Joining Date</label>
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group address-group">
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter Address"
              rows="3"
            />
          </div>
        </div>

        <div className="button-group">
          <button className="save-button" onClick={handleSave}>
            Register
          </button>
        </div>

        <p className="already-registered">
          Already registered?{" "}
          <span className="login-link" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterClient;
