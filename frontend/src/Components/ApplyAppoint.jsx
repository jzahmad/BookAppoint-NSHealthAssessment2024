import React, { useState,useContext } from "react";
import "../Styles/ApplyApp.css";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate , useParams  } from "react-router-dom";
import axios from 'axios'; // Import Axios
import { context } from './Context'

function Apply() {
  const [showApplyModal, setShowApplyModal] = useState(true);
  const [name, setName] = useState('');
  const [healthId, setHealthId] = useState('');
  const [prev, setPrev] = useState('');
  const [contact, setContact] = useState('');
  const [errorMessages, setErrorMessage] = useState('');
  const { postID } = useParams(); // Get postID from URL
 

  const navigate = useNavigate();
  const {userID} = useParams();

  const handleCloseModal = () => {
    setShowApplyModal(false);
    navigate(`/pick-appointments/${userID}`);
  };

  const dataValidation = () => {
    if (!name.trim()) {
      setErrorMessage("Please enter your name");
    } else if (isNaN(healthId) || healthId.length !== 10) {
      setErrorMessage("Please enter your health Id");
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = dataValidation();

    if (isValid) {
      try {
        const response = await axios.post('http://localhost:80/apply', {
          userid:userID,
          name: name,
          healthId: healthId,
          prev: prev,
          contact: contact,
          postID: postID // Include postID in the request
        });

        setErrorMessage(response.data); // Handle response from the server as needed
        
      } catch (error) {
        console.error('Error submitting form:', error);
        // Handle error, show error message to the user, etc.
      }
    }
  };


  return (
    <div>
      {showApplyModal && (
        <div className="form-wrapper">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="form-group">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label>Health ID:</Form.Label>
              <Form.Control type="text" value={healthId} onChange={(e) => setHealthId(e.target.value)} />
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label>Any previous Appointment (optional)</Form.Label>
              <Form.Control type="text" value={prev} onChange={(e) => setPrev(e.target.value)} />
            </Form.Group>

            <Form.Group className="form-group">
              <Form.Label>Phone or Email</Form.Label>
              <Form.Control type="text" value={contact} onChange={(e) => setContact(e.target.value)} />
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
