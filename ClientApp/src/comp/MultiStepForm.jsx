import React, { useState } from 'react';
import {Col, FormGroup, Input, Label, Row} from "reactstrap"
import "./MultiStepForm.css"

const MultiStepForm = ({ onStepClick }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    loanAmount: '',
  });

  const handleStepClick = (event) => {
    // Your step click logic here

    // Prevent the click event from propagating to the modal
    event.stopPropagation();

    // If you need to perform additional actions when a step is clicked
    if (onStepClick) {
      onStepClick();
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const nextStep = (e) => {
    e.preventDefault();
    // setStep((prevStep) => prevStep + 1);
    setStep((prevStep) => Math.min(prevStep + 1, 3));
  };

  const prevStep = (e) => {
    e.preventDefault();
    // setStep((prevStep) => prevStep - 1);
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Form submitted:', formData);
  };

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="form-step">
            <h4>Step 1: Personal Information</h4>
            <form onSubmit={nextStep}>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label>Full Name</Label>
                    <Input 
                       id="fullName"
                       name="fullName"
                       placeholder="Enter full name ..."
                       type="email"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>
                      Gender
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder="Enter full name ..."
                      type="select"
                    >
                      <option value="" disabled selected hidden>
                        Select Gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <label>
                First Name:
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br />
              <label>
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br />
              <button type="submit">Next</button>
            </form>
          </div>
        );
      case 2:
        return (
          <div  className="form-step">
            <h2>Step 2: Loan Amount</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Loan Amount:
                <input
                  type="text"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br />
              <button type="button" onClick={prevStep}>
                Previous
              </button>
              <button type="submit">Submit</button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="multi-step-form" onClick={handleStepClick}>
      {renderFormStep()}
    </div>
  );
};

export default MultiStepForm;