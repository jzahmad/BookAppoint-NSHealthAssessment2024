import React, { useState, useContext } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate, useParams } from "react-router-dom";
import '../../Styles/homepage.css';
import { DtPicker } from 'react-calendar-datetime-picker';
import 'react-calendar-datetime-picker/dist/style.css';
import '../../Styles/PostApp.css';
import axios from 'axios';
import { context } from '../Context';

function AdminPost() {


  const navigate = useNavigate();
  const userID=useParams().userID;
  console.log(userID)

  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');
  const [errorMessages,setErrorMessage]=useState('');

  const dataValidation = () => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;

    if (!date) {
      setErrorMessage("Please select a date");
    } else if (!time.trim() || !regex.test(time)) {
      setErrorMessage("Please enter a valid time in HH:MM:SS");
    } else if (!reason.trim()) {
      setErrorMessage("Please enter the type of appointment");
    } else if (!name.trim()) {
      setErrorMessage("Please enter your name");
    } else if (!duration.trim() || isNaN(duration) || parseInt(duration) <= 0) {
      setErrorMessage("Please enter a valid duration in minutes");
    } else if (!selectedHospital) {
      setErrorMessage("Please select a hospital");
    } else {
      setErrorMessage("");
      return true; 
    }
    return false;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!dataValidation()) {
      return;
    }

    const formData = { userID, date, time, reason, duration, selectedHospital };
    try {

      const response = await axios.post('http://localhost:80/post', formData);
      setErrorMessage(response.data.message);
     
    } catch (error) {
      setErrorMessage("Error in posting appointmet"); 
    }
  }

  const FacilityList = () => {
    return [
      "Cape Breton Regional Hospital",
      "Northside General Hospital",
      "Victoria County Memorial Hospital",
      "Inverness Consolidated Memorial Hospital",
      "Aberdeen Hospital",
      "New Waterford Consolidated Hospital",
      "Strait - Richmond Hospital",
      "Sacred Heart Community Health Centre",
      "Glace Bay Health Care Facility",
      "St. Martha’s Regional Hospital",
      "Eastern Memorial Hospital",
      "Sutherland Harris Memorial Hospital",
      "Buchanan Memorial Community Health Centre",
      "St. Mary’s Memorial Hospital",
      "Eastern Kings Memorial Community Health Centre",
      "Hants Community Hospital",
      "Queens General Hospital",
      "Soldiers Memorial Hospital",
      "Roseway Hospital",
      "Western Kings Memorial Health Centre",
      "Guysborough Memorial Hospital",
      "Yarmouth Regional Hospital",
      "Annapolis Community Health Centre",
      "Valley Regional Hospital",
      "North Cumberland Memorial Hospital",
      "Cumberland Regional Health Care Centre",
      "Cobequid Community Health Centre",
      "Integrated Chronic Care Service",
      "Fishermen's Memorial Hospital",
      "South Shore Regional Hospital",
      "South Cumberland Community Care Centre",
      "Lillian Fraser Memorial Hospital",
      "Twin Oaks Memorial Hospital",
      "Bayview Memorial Health Centre",
      "All Saints Springhill Hospital",
      "Digby General Hospital",
      "IWK Health Centre",
      "East Coast Forensic Hospital",
      "QEII - Victoria General (VG) Site",
      "The Nova Scotia Hospital",
      "Eastern Shore Memorial Hospital",
      "Musquodoboit Valley Memorial Hospital",
      "QEII - Halifax Infirmary Site",
      "Nova Scotia Rehabilitation Centre",
      "Dartmouth General Hospital",
      "Kings Regional Health & Regional Rehabilitation Centre",
      "Colchester East Hants Health Centre",
      "St. Anne's Community and Nursing"
    ].sort();
  };

  const handleHospitalChange = (event) => {
    setSelectedHospital(event.target.value);
  }

  return (
    <div className="post-container">
      <div className="navbar">
        <h1 className="logo">BookAppoint (admin)</h1>
        <nav className="nav-links">
             <Link to="/admin/all-appointments" className="nav-link">All Appointments</Link>
             <Link to="/admin/post-appointment" className="nav-link active">Post Appointment</Link>
        </nav>

      </div>

      <div className="form-wrapper">
        <Form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Date</label>
            <DtPicker onChange={(date) => setDate(date)} value={time}/>
          </div>

          <Form.Group className="form-group">
            <Form.Label>Time (HH:MM:SS)</Form.Label>
            <Form.Control type="text" value={time} onChange={(e) => setTime(e.target.value)}/>
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label>Type of Appointment</Form.Label>
            <Form.Control type="text" value={reason} onChange={(e) => setReason(e.target.value)}/>
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)}/>
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label>Duration (minutes)</Form.Label>
            <Form.Control type="text" value={duration} onChange={(e) => setDuration(e.target.value)}/>
          </Form.Group>  

          <Form.Group className="form-group">
            <Form.Label>Hospital</Form.Label>
            <Form.Control as="select" onChange={handleHospitalChange} value={selectedHospital}>
              <option value="">Select Hospital</option>
              {FacilityList().map((facility, index) => (
                <option key={index} value={facility}>{facility}</option>
              ))}
            </Form.Control>
          </Form.Group> 
          {errorMessages && <div style={{ color: 'red' }}>{errorMessages}</div>}
          <Button className='btn-submit' block size="lg" type="submit">Submit</Button>  
        </Form>   
      </div>
    </div>
  );
}

export default AdminPost;
