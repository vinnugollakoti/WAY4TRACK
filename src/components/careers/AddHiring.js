import React, { useState } from 'react';
import ApiService from '../../components/Services/ApiServices';
import { useNavigate } from 'react-router';
import { initialAuthState } from '../../components/Services/ApiServices';
import { motion } from 'framer-motion';
import toast, { Toaster } from "react-hot-toast";
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const AddHiring = () => {
  const navigate = useNavigate();

  const [qualifications, setQualifications] = useState([
    { name: '', marks: '', year: '' },
  ]);

  const [formData, setFormData] = useState({
    candidateName: '',
    phoneNumber: '',
    email: '',
    address: '',
    resume: null,
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
      const fileName = file.name;
      setFileUploadedMessage(fileName);
      setFormData((prev) => ({
        ...prev,
        resumePath: fileName,
        resume: file,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = new FormData();
      
      // Append all form data
      payload.append('candidateName', formData.candidateName);
      payload.append('phoneNumber', formData.phoneNumber);
      payload.append('email', formData.email);
      payload.append('address', formData.address);
      payload.append('dateOfUpload', formData.dateOfUpload);
      payload.append('status', formData.status);
      payload.append('companyCode', formData.companyCode);
      payload.append('unitCode', formData.unitCode);

      // Append qualifications
      qualifications.forEach((q, index) => {
        payload.append(`qualifications[${index}][qualificationName]`, q.name);
        payload.append(`qualifications[${index}][marks]`, q.marks);
        payload.append(`qualifications[${index}][yearOfPass]`, q.year);
      });

      // Append resume file
      if (formData.resume) {
        payload.append('file', formData.resume);
      }

      // Make POST request to careers endpoint
      const response = await ApiService.post(
        "/client/handleCareersDetails",
        payload,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (response.status === 200 || response.status) {
        toast.success('Application submitted successfully!');
        navigate('/hiring');
      } else {
        toast.error('Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Error saving career details:', error);
      toast.error('Failed to submit application. Please try again.');
    }
  };

  // Handle phone call
  const handlePhoneClick = () => {
    window.open('tel:+919110729757');
  };

  // Handle email
  const handleEmailClick = () => {
    window.open('mailto:way4track@gmail.com');
  };

  return (
    <Container className="my-5">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-5"
      >
        <h1 className="display-4 fw-bold mb-3" style={{color: '#60A442'}}>Join Our Team</h1>
        <p className="lead text-muted mb-4">
          We're looking for talented individuals who are passionate about innovation and technology. 
          Start your journey with us today.
        </p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <div className="text-center">
            <div className="h4 mb-1" style={{color: '#60A442'}}>50+</div>
            <div className="text-muted">Team Members</div>
          </div>
          <div className="text-center">
            <div className="h4 mb-1" style={{color: '#60A442'}}>10+</div>
            <div className="text-muted">Countries</div>
          </div>
          <div className="text-center">
            <div className="h4 mb-1" style={{color: '#60A442'}}>5+</div>
            <div className="text-muted">Years Experience</div>
          </div>
        </div>
      </motion.div>

      <Row className="justify-content-center">
        <Col lg={10}>
          <Row className="g-4">
            {/* Application Form */}
            <Col md={7}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="shadow-lg border-0 rounded-3">
                  <Card.Header className="py-4 rounded-top-3" style={{backgroundColor: '#60A442', color: 'white'}}>
                    <h3 className="mb-0 text-center">Application Form</h3>
                  </Card.Header>
                  <Card.Body className="p-4">
                    <Row className="g-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-semibold">Full Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="candidateName"
                            value={formData.candidateName}
                            onChange={handleInputChange}
                            className="border-2 py-2"
                            placeholder="Enter your full name"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-semibold">Phone Number *</Form.Label>
                          <Form.Control
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className="border-2 py-2"
                            placeholder="Enter phone number"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={12}>
                        <Form.Group>
                          <Form.Label className="fw-semibold">Email Address *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="border-2 py-2"
                            placeholder="Enter email address"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={12}>
                        <Form.Group>
                          <Form.Label className="fw-semibold">Address *</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="border-2 py-2"
                            placeholder="Enter your complete address"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Qualifications Section */}
                    <div className="mt-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0" style={{color: '#60A442'}}>Educational Qualifications</h5>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={handleAddQualification}
                          className="rounded-pill"
                          style={{
                            color: '#60A442',
                            borderColor: '#60A442',
                            backgroundColor: 'transparent'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#60A442';
                            e.target.style.color = 'white';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.color = '#60A442';
                          }}
                        >
                          <i className="bi bi-plus-circle me-2"></i>
                          Add Qualification
                        </Button>
                      </div>

                      {qualifications.map((qualification, index) => (
                        <Row key={index} className="g-2 align-items-center mb-3 p-3 bg-light rounded-3">
                          <Col md={5}>
                            <Form.Control
                              type="text"
                              placeholder="Degree/Qualification"
                              value={qualification.name}
                              onChange={(e) =>
                                handleQualificationChange(index, 'name', e.target.value)
                              }
                              className="border-1"
                            />
                          </Col>
                          <Col md={3}>
                            <Form.Control
                              type="text"
                              placeholder="Marks/CGPA"
                              value={qualification.marks}
                              onChange={(e) =>
                                handleQualificationChange(index, 'marks', e.target.value)
                              }
                              className="border-1"
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
                              className="border-1"
                            />
                          </Col>
                          <Col md={1}>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleRemoveQualification(index)}
                              className="border-0"
                              title="Remove qualification"
                            >
                              <i className="bi bi-trash"></i>
                            </Button>
                          </Col>
                        </Row>
                      ))}
                    </div>

                    {/* Resume Upload */}
                    <Form.Group className="mt-4">
                      <Form.Label className="fw-semibold">Upload Resume *</Form.Label>
                      <Form.Control
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="border-2 py-2"
                      />
                      {fileUploadedMessage && (
                        <Form.Text className="text-success d-block mt-2">
                          <i className="bi bi-check-circle-fill me-2"></i>
                          File uploaded: {fileUploadedMessage}
                        </Form.Text>
                      )}
                      <Form.Text className="text-muted">
                        Supported formats: PDF, DOC, DOCX (Max: 5MB)
                      </Form.Text>
                    </Form.Group>

                    <div className="d-flex justify-content-end mt-4">
                      <Button 
                        size="lg" 
                        onClick={handleSubmit}
                        className="px-5 py-2 rounded-pill fw-semibold"
                        style={{
                          backgroundColor: '#60A442',
                          borderColor: '#60A442',
                          color: 'white'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#4a8234';
                          e.target.style.borderColor = '#4a8234';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#60A442';
                          e.target.style.borderColor = '#60A442';
                        }}
                      >
                        Submit Application
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            {/* Benefits & Info Section */}
            <Col md={5}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="h-100"
              >
                {/* Why Join Us Card */}
                <Card className="shadow-sm border-0 rounded-3 mb-4 bg-light">
                  <Card.Body className="p-4">
                    <h4 className="mb-3" style={{color: '#60A442'}}>Why Join Us?</h4>
                    <div className="d-grid gap-3">
                      {[
                        { icon: '💼', title: 'Competitive Salary', desc: 'Industry-standard compensation packages' },
                        { icon: '🏠', title: 'Flexible Work', desc: 'Remote and hybrid work options' },
                        { icon: '📚', title: 'Learning & Growth', desc: 'Continuous skill development programs' },
                        { icon: '⚕️', title: 'Health Benefits', desc: 'Comprehensive medical insurance' },
                        { icon: '🎯', title: 'Career Progression', desc: 'Clear growth paths and promotions' },
                        { icon: '🤝', title: 'Great Culture', desc: 'Collaborative and inclusive environment' },
                      ].map((benefit, index) => (
                        <div key={index} className="d-flex align-items-start">
                          <span className="fs-5 me-3">{benefit.icon}</span>
                          <div>
                            <h6 className="mb-1">{benefit.title}</h6>
                            <p className="text-muted small mb-0">{benefit.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card.Body>
                </Card>

                {/* Quick Contact */}
                <Card className="shadow-sm border-0 rounded-3 mt-4" style={{border: '1px solid #60A442'}}>
                  <Card.Body className="p-4 text-center">
                    <h5 className="mb-3" style={{color: '#60A442'}}>Have Questions?</h5>
                    <p className="text-muted mb-3">
                      Our HR team is here to help you with any questions about the application process.
                    </p>
                    <div className="d-grid gap-2">
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="rounded-pill"
                        style={{
                          color: '#60A442',
                          borderColor: '#60A442',
                          backgroundColor: 'transparent'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#60A442';
                          e.target.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = '#60A442';
                        }}
                        onClick={handleEmailClick}
                      >
                        <i className="bi bi-envelope me-2"></i>
                        way4track@gmail.com
                      </Button>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="rounded-pill"
                        style={{
                          color: '#60A442',
                          borderColor: '#60A442',
                          backgroundColor: 'transparent'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#60A442';
                          e.target.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = '#60A442';
                        }}
                        onClick={handlePhoneClick}
                      >
                        <i className="bi bi-telephone me-2"></i>
                        +91 9110 72 9757
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Process Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-5 pt-5"
      >
        <Row className="text-center">
          <Col>
            <h3 className="mb-5" style={{color: '#60A442'}}>Our Hiring Process</h3>
          </Col>
        </Row>
        <Row className="g-4 justify-content-center">
          {[
            { step: '1', title: 'Application Review', desc: 'We carefully review each application' },
            { step: '2', title: 'Initial Screening', desc: 'Phone interview with HR team' },
            { step: '3', title: 'Technical Assessment', desc: 'Skills and knowledge evaluation' },
            { step: '4', title: 'Final Interview', desc: 'Meeting with team leads' },
            { step: '5', title: 'Offer', desc: 'Welcome to the team!' },
          ].map((process, index) => (
            <Col lg={2} md={4} sm={6} key={index}>
              <div className="text-center">
                <div 
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ 
                    width: '60px', 
                    height: '60px', 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold',
                    backgroundColor: '#60A442',
                    color: 'white'
                  }}
                >
                  {process.step}
                </div>
                <h6 style={{color: '#60A442'}}>{process.title}</h6>
                <p className="text-muted small">{process.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </motion.div>
    </Container>
  );
};

export default AddHiring;