import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { FaPaperPlane, FaSpinner } from 'react-icons/fa'
import './ContactForm.css'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    deviceType: '',
    newsletter: false
  })
  
  const [formState, setFormState] = useState({
    isSubmitting: false,
    isSubmitted: false,
    hasError: false,
    errors: {}
  })
  
  const validate = () => {
    const errors = {}
    
    if (!formData.firstName.trim()) errors.firstName = 'First name is required'
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required'
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid'
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required'
    } else if (!/^\+?[0-9\s-()]{8,}$/.test(formData.phone)) {
      errors.phone = 'Phone number is invalid'
    }
    
    if (!formData.message.trim()) errors.message = 'Message is required'
    if (!formData.deviceType) errors.deviceType = 'Please select a device type'
    
    return errors
  }
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
    
    // Clear error when field is being edited
    if (formState.errors[name]) {
      setFormState({
        ...formState,
        errors: {
          ...formState.errors,
          [name]: null
        }
      })
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    const errors = validate()
    if (Object.keys(errors).length > 0) {
      setFormState({
        ...formState,
        hasError: true,
        errors
      })
      return
    }
    
    setFormState({
      ...formState,
      isSubmitting: true,
      hasError: false,
      errors: {}
    })
    
    // Simulate API call
    setTimeout(() => {
      setFormState({
        isSubmitting: false,
        isSubmitted: true,
        hasError: false,
        errors: {}
      })
      
      // Reset form after success
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        deviceType: '',
        newsletter: false
      })
    }, 1500)
  }

  return (
    <div className="contact-form card p-4 shadow-lg">
      <h2 className="section-title">Send Us a Message</h2>
      <div className="divider mb-4"></div>
      
      {formState.isSubmitted ? (
        <Alert 
          variant="success" 
          className="success-message animated-fadeInUp"
        >
          <div className="d-flex align-items-center">
            <div className="success-icon">✓</div>
            <div>
              <h5 className="mb-1">Thank you for contacting us!</h5>
              <p className="mb-0">We've received your message and will get back to you within 24 hours.</p>
            </div>
          </div>
        </Alert>
      ) : (
        <Form onSubmit={handleSubmit} noValidate>
          <div className="row g-3">
            <div className="col-md-6">
              <Form.Group controlId="firstName">
                <Form.Label>First Name*</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  isInvalid={!!formState.errors.firstName}
                  className="form-field"
                />
                <Form.Control.Feedback type="invalid">
                  {formState.errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            
            <div className="col-md-6">
              <Form.Group controlId="lastName">
                <Form.Label>Last Name*</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  isInvalid={!!formState.errors.lastName}
                  className="form-field"
                />
                <Form.Control.Feedback type="invalid">
                  {formState.errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            
            <div className="col-md-6">
              <Form.Group controlId="email">
                <Form.Label>Email Address*</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!formState.errors.email}
                  className="form-field"
                />
                <Form.Control.Feedback type="invalid">
                  {formState.errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            
            <div className="col-md-6">
              <Form.Group controlId="phone">
                <Form.Label>Phone Number*</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  isInvalid={!!formState.errors.phone}
                  className="form-field"
                />
                <Form.Control.Feedback type="invalid">
                  {formState.errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            
            <div className="col-12">
              <Form.Group controlId="subject">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-field"
                />
              </Form.Group>
            </div>
            
            <div className="col-12">
              <Form.Group controlId="deviceType">
                <Form.Label>Device Type*</Form.Label>
                <Form.Select
                  name="deviceType"
                  value={formData.deviceType}
                  onChange={handleChange}
                  isInvalid={!!formState.errors.deviceType}
                  className="form-field"
                >
                  <option value="">Select a device type</option>
                  <option value="bike">Bike Tracker</option>
                  <option value="car">Car Tracker</option>
                  <option value="fleet">Fleet Management</option>
                  <option value="other">Other</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {formState.errors.deviceType}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            
            <div className="col-12">
              <Form.Group controlId="message">
                <Form.Label>Your Message*</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  isInvalid={!!formState.errors.message}
                  className="form-field"
                />
                <Form.Control.Feedback type="invalid">
                  {formState.errors.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            
            <div className="col-12">
              <Form.Group controlId="newsletter" className="mb-3">
                <Form.Check
                  type="checkbox"
                  name="newsletter"
                  label="Subscribe to our newsletter for updates and special offers"
                  checked={formData.newsletter}
                  onChange={handleChange}
                  className="custom-checkbox"
                />
              </Form.Group>
            </div>
            
            <div className="col-12">
              {formState.hasError && (
                <Alert variant="danger" className="mb-3">
                  Please fix the errors above to continue.
                </Alert>
              )}
              
              <Button 
                variant="primary" 
                type="submit" 
                className="submit-btn"
                disabled={formState.isSubmitting}
              >
                {formState.isSubmitting ? (
                  <>
                    <FaSpinner className="spinner-icon" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="me-2" />
                    Send Message
                  </>
                )}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </div>
  )
}

export default ContactForm