import React, { useState, useEffect } from 'react';
import {Col, FormGroup, Input, Label, Row,Container} from "reactstrap"
import "./MultiStepForm.css"
import province from "./address/province.json"
import city from "./address/city.json"
import barangay from "./address/barangay.json"

const MultiStepForm = ({ onStepClick }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    birthDate: '',
    province: '',
    city: '',
    additionalAddressInfo: '',
    email: '',
    contactNumber: 0 ,
    loanType: '',
    capital: 0,
    interest: 0,
    noOfPayments: 0,
    deductCBU: 0,
    deductInsurance: 0,
    deductOther: 0,
  });

  const [provinces, setProvinces] = useState(province);
  const [cities, setCities] = useState(city);
  const [barangays, setBarangays] = useState(barangay);
  const [originalCities, setOriginalCities] = useState(city);
  const [originalBarangays, setOriginalBarangays] = useState(barangay);

  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedBarangay, setSelectedBarangay] = useState('');

  const [totalBringHome, setTotalBringHome] = useState(0);

  
  const calculateTotalBringHome = () => {
    const { capital, interest, deductCBU, deductInsurance, deductOther } = formData;

    // Calculate total deductions
    const totalDeductions = parseFloat(deductCBU) + parseFloat(deductInsurance) + parseFloat (deductOther);
    console.log("BH is : " + totalDeductions);

    const intrst = capital * (parseFloat(interest) / 100);
    console.log("intrest : " + intrst);

    // Calculate total bring home cash
    const totalBringHome = (parseFloat(capital) - intrst) - totalDeductions;
    
    setTotalBringHome(totalBringHome);
  };

  useEffect(() => {
    calculateTotalBringHome();
  }, [formData]);



  useEffect(() => {
    // Save the original lists when the component mounts
    setOriginalCities(city);
    setOriginalBarangays(barangay);
  }, []);

  const handleProvinceChange = (event) => {
    const selectedProvinceCode = event.target.value;
    setSelectedProvince(selectedProvinceCode);

    // Filter cities based on the selected province
    const filteredCities = originalCities.filter((city) => city.province_code === selectedProvinceCode);
    setCities(filteredCities);
    setSelectedCity('');
    
    // Filter barangays based on the selected city
    const filteredBarangays = originalBarangays.filter((barangay) => barangay.city_code === selectedCity);
    setBarangays(filteredBarangays);
    setSelectedBarangay('');
  };

  const handleCityChange = (event) => {
    const selectedCityCode = event.target.value;
    setSelectedCity(selectedCityCode);

    // Filter barangays based on the selected city
    const filteredBarangays = originalBarangays.filter((barangay) => barangay.city_code === selectedCityCode);
    setBarangays(filteredBarangays);
    setSelectedBarangay('');
  };

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
                       value={formData.fullName}
                       onChange={handleInputChange}
                       required
                       placeholder="Enter full name ..."
                       type="text"
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
                      id="gender"
                      name="gender"
                      type="select"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required

                    >
                      <option value="" disabled selected hidden>
                        Select Gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Input>
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label>Birth date</Label>
                    <Input 
                       id="birthDate"
                       name="birthDate"
                       type="date"
                       value={formData.birthDate}
                       onChange={handleInputChange}
                       required
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <FormGroup>
                    <Label for="selectProvince">Province</Label>
                    <Input
                      type="select"
                      name="province"
                      id="selectProvince"
                      value={selectedProvince}
                      onChange={handleProvinceChange}
                      required
                    >
                      <option value="" disabled >Select Province</option>
                      {provinces.map((province) => (
                        <option key={province.province_code} value={province.province_code}>
                          {province.province_name}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>

                <Col md={4}>
                  <FormGroup>
                    <Label for="selectCity">City</Label>
                    <Input
                      type="select"
                      name="city"
                      id="selectCity"
                      value={selectedCity}
                      onChange={handleCityChange}
                      required
                    >
                      <option value="" disabled>Select City</option>
                      {cities.map((city) => (
                        <option key={city.city_code} value={city.city_code}>
                          {city.city_name}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>

                <Col md={4}>
                  <FormGroup>
                    <Label for="selectBarangay">Barangay</Label>
                    <Input
                      type="select"
                      name="barangay"
                      id="selectBarangay"
                      required
                      value={selectedBarangay}
                      onChange={(e) => setSelectedBarangay(e.target.value)}
                    >
                      <option value="" disabled>Select Barangay</option>
                      {barangays.map((barangay) => (
                        <option key={barangay.brgy_code} value={barangay.brgy_code}>
                          {barangay.brgy_name}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
              </Row> 
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label>
                        Address
                    </Label>
                    <Input
                       id="Purok"
                       name="additionalAddressInfo"
                       placeholder="Address additional information"
                       type="text"
                       value={formData.additionalAddressInfo}
                      onChange={handleInputChange}
                      required
                    />
                    
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>
                        Email
                    </Label>
                    <Input
                       id="email"
                       name="email"
                       placeholder="email"
                       type="email"
                       value={formData.email}
                      onChange={handleInputChange}
                    />
                    
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label>
                        Contact
                    </Label>
                    <Input
                       id="contactNumber"
                       name="contactNumber"
                       placeholder="Contact number"
                       type="number"
                       value={formData.contactNumber}
                      onChange={handleInputChange}
                    />
                    
                  </FormGroup>
                </Col>
              </Row>

              <Container className="text-center mt-4">
                <button type="submit">Next</button> 
              </Container>
            </form>
          </div>
        );
      case 2:
        return (
          <div  className="form-step">
            <h4>Step 2: Loan Information</h4>
            <form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>
                      Loan Type
                    </Label>
                    <Input
                      type='select'
                      required
                    >
                      <option value="" disabled selected hidden>
                        Select Loan Type
                      </option>
                      <option value="Daily">Daily</option>
                      <option value="Emergency">Emergency</option>
                      <option value="PO Cash">PO Cash</option>
                      <option value="Others">Others</option>
                    </Input>
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label>Amount to borrow</Label>
                    <Input
                      required
                      type='number'
                      name='capital'
                      value={formData.capital}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>Interest</Label>
                    <Input
                      required
                      type='number'
                      name='interest'
                      value={formData.interest}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>No of payments</Label>
                    <Input
                      required
                      type='number'
                      name='noOfPayments'
                      value={formData.noOfPayments}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <h6>Deductions</h6>
              <Row>
                <Col md={4}>
                  <FormGroup>
                    <Label>CBU</Label>
                    <Input
                      required
                      type='number'
                      name='deductCBU'
                      value={formData.deductCBU}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>

                <Col md={4}>
                  <FormGroup>
                    <Label>Insurance</Label>
                    <Input
                      required
                      type='number'
                      name='deductInsurance'
                      value={formData.deductInsurance}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label>Other</Label>
                    <Input
                      required
                      type='number'
                      name='deductOther'
                      value={formData.deductOther}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <h6>Other information</h6>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>Interested amount</Label>
                    <Input
                      disabled
                      type='number'
                    />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label>Bring home amount</Label>
                    <Input
                      disabled
                      type='number'
                      value={totalBringHome}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Container className="text-center mt-4">
                <button type="button" onClick={prevStep}>
                  Previous
                </button>
                <button type="submit">Submit</button>
              </Container>
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