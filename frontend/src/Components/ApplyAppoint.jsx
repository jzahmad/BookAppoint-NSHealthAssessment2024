import React, { useState } from "react";
import "../Styles/ApplyApp.css";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function Apply() {
  const [showApplyModal, setShowApplyModal] = useState(true);
  const [name, setName] = useState('');
  const [reason, setReason] = useState('');
  const [prev, setPrev] = useState('');
  const [contact, setContact] = useState('');
  const [errorMessages, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleCloseModal = () => {
    setShowApplyModal(false);
    navigate('/pick-appointments')
  };

  const dataValidation = () => {
    if (!name.trim()) {
      setErrorMessage("Please enter your name");
    } else if (!reason.trim()) {
      setErrorMessage("Please enter the type of appointment");
    } else if (!prev.trim()) {
      setErrorMessage("Please enter any previous appointment");  
    } else if (!contact.trim()) {
      setErrorMessage("Please enter a valid contact info.");
    } else {
      setErrorMessage(""); // Clear error messages if all fields are valid
      return true; // Indicate validation success
    }
    return false; // Indicate validation failure
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = dataValidation();

    if (isValid) {
      handleCloseModal();
    }
  };

  return (
    <div>
      {showApplyModal && (
        <div className="form-wrapper">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="form-group">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label>Reason</Form.Label>
              <Form.Control type="text" value={reason} onChange={(e) => setReason(e.target.value)}/>
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label>Any previous Appointment (optional)</Form.Label>
              <Form.Control type="text" value={prev} onChange={(e) => setPrev(e.target.value)}/>
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label>Phone or Email</Form.Label>
              <Form.Control type="text" value={contact} onChange={(e) => setContact(e.target.value)}/>
            </Form.Group>
            
            {errorMessages && <div style={{ color: 'red' }}>{errorMessages}</div>}
            
            <Row>
              <Col>
                <Button className='btn-submit' block size="lg" type="submit">Submit</Button>
              </Col>
              <Col>
                <Button className='btn-go-back' block size="lg" type="button" onClick={handleCloseModal}>Go Back</Button>
              </Col>
            </Row>
          </Form>   
        </div>
      )}
    </div>
  );
}

export default Apply;
