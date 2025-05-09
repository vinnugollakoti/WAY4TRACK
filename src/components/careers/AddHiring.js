import React, { useState } from 'react';
import ApiService from '../../components/Services/ApiServices';
import { useNavigate } from 'react-router';
import { initialAuthState } from '../../components/Services/ApiServices';
import { motion } from 'framer-motion';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const AddHiring = () => {
  const navigate = useNavigate();

  const [qualifications, setQualifications] = useState([
    { name: '', marks: '', year: '' },
  ]);

  const [formData, setFormData] = useState({
    id: null,
    candidateName: '',
    phoneNumber: '',
    email: '',
    address: '',
    resume: null,
    file: '',
    dateOfUpload: new Date().toISOString().split('T')[0],
    status: 'INTERVIEWED',
    companyCode: initialAuthState.companyCode,
    unitCode: initialAuthState.unitCode,
  });

  const [fileUploadedMessage, setFileUploadedMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQualificationChange = (index, field, value) => {
    const updatedQualifications = [...qualifications];
    updatedQualifications[index][field] = value;
    setQualifications(updatedQualifications);
  };

  const handleAddQualification = () => {
    setQualifications([...qualifications, { name: '', marks: '', year: '' }]);
  };

  const handleRemoveQualification = (index) => {
    const updatedQualifications = qualifications.filter((_, i) => i !== index);
    setQualifications(updatedQualifications);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const filePath = URL.createObjectURL(file);
      setFileUploadedMessage(filePath);
      setFormData((prev) => ({
        ...prev,
        resumePath: filePath,
        resume: file,
      }));
    }
  };

  const handleSubmit = async () => {
    const payload = new FormData();
    payload.append('candidateName', formData.candidateName);
    payload.append('phoneNumber', formData.phoneNumber);
    payload.append('email', formData.email);
    payload.append('address', formData.address);
    payload.append('dateOfUpload', formData.dateOfUpload);
    payload.append('status', formData.status);
    payload.append('companyCode', formData.companyCode);
    payload.append('unitCode', formData.unitCode);

    qualifications.forEach((q, index) => {
      payload.append(`qualifications[${index}][qualificationName]`, q.name);
      payload.append(`qualifications[${index}][marks]`, q.marks);
      payload.append(`qualifications[${index}][yearOfPass]`, q.year);
    });

    if (formData.resume) {
      payload.append('file', formData.resume);
    }

    try {
      const endpoint = `/hiring/saveHiringDetailsWithResume`;
      const response = await ApiService.post(endpoint, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.data) {
        alert('Hiring details saved successfully!');
        navigate('/hiring');
      } else {
        alert('Failed to save hiring details. Please try again.');
      }
    } catch (error) {
      console.error('Error saving hiring details:', error);
      alert('Failed to save hiring details. Please try again.');
    }
  };

  return (
    <Container className="my-5">
      <Row>
        <Col md={6}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-lg p-4">
              <h2 className="mb-4">Career</h2>

              <Form.Group className="mb-3">
                <Form.Label>Candidate Name</Form.Label>
                <Form.Control
                  type="text"
                  name="candidateName"
                  value={formData.candidateName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <h5 className="mt-4">Qualifications</h5>
              <Button
                variant="success"
                size="sm"
                className="mb-3"
                onClick={handleAddQualification}
              >
                + Add Qualification
              </Button>

              {qualifications.map((qualification, index) => (
                <Row key={index} className="g-2 align-items-center mb-3 border rounded p-2 bg-light">
                  <Col md={4}>
                    <Form.Control
                      type="text"
                      placeholder="Qualification"
                      value={qualification.name}
                      onChange={(e) =>
                        handleQualificationChange(index, 'name', e.target.value)
                      }
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Control
                      type="text"
                      placeholder="Marks"
                      value={qualification.marks}
                      onChange={(e) =>
                        handleQualificationChange(index, 'marks', e.target.value)
                      }
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Control
                      type="text"
                      placeholder="Year"
                      value={qualification.year}
                      onChange={(e) =>
                        handleQualificationChange(index, 'year', e.target.value)
                      }
                    />
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleRemoveQualification(index)}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
              ))}

              <Form.Group className="mb-3">
                <Form.Label>Upload Resume</Form.Label>
                <Form.Control
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                />
                {fileUploadedMessage && (
                  <Form.Text className="text-success">
                    File uploaded: {fileUploadedMessage}
                  </Form.Text>
                )}
              </Form.Group>

              <div className="d-flex justify-content-end">
                <Button variant="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </Card>
          </motion.div>
        </Col>

        <Col md={6}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Row className="g-3">
              <Col md={6}>
                <img
                  src="./images/career1.avif"
                  alt="Job Interview"
                  className="img-fluid rounded"
                />
              </Col>
              <Col md={6}>
                <img
                  src="./images/career2.avif"
                  alt="Job Vacancy"
                  className="img-fluid rounded"
                />
              </Col>
              <Col md={6}>
                <img
                  src="./images/career3.avif"
                  alt="Office Job Process"
                  className="img-fluid rounded"
                />
              </Col>
              <Col md={6}>
                <img
                  src="./images/career4.avif"
                  alt="Colleagues Working"
                  className="img-fluid rounded"
                />
              </Col>
              {/* <Col md={6}>
                <img
                  src="./images/career5.avif"
                  alt="Colleagues Working"
                  className="img-fluid rounded"
                />
              </Col>
              <Col md={6}>
                <img
                  src="./images/career7.avif"
                  alt="Colleagues Working"
                  className="img-fluid rounded"
                />
              </Col> */}
            </Row>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddHiring;
