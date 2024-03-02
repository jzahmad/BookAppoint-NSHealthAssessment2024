import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../Styles/homepage.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Schedule.css';

function Schedule() {
  const navigate = useNavigate();
  
  const handleApply = () => {
    navigate('/pick-appointments');
  };

  return (
    <div>
      <div className="navbar">
        <h1 className="logo">BookAppoint</h1>
        <nav className="nav-links">
          <Link to="/pick-appointments" className="nav-link">Pick Appointments</Link>
          <Link to="/post-appointment" className="nav-link active">Post Appointment</Link>
          <Link to="/your-schedule" className="nav-link">Your Schedule</Link>
        </nav>
      </div>
      <div className="card-container">
        <Card className="doctor-card">
          <Card.Body>
            <Card.Text>Dr. Name: John Doe</Card.Text>
            <Card.Text>Hospital: City Hospital</Card.Text>
            <Card.Text>Duration: 1 hour</Card.Text>
            <Card.Text>Type: Regular Checkup</Card.Text>
            <Button variant="primary" onClick={handleApply}>Cancel</Button>
          </Card.Body>
        </Card>
      </div>
      <div className="card-container">
        <Card className="doctor-card">
          <Card.Body>
            <Card.Text>Dr. Name: John Doe</Card.Text>
            <Card.Text>Hospital: City Hospital</Card.Text>
            <Card.Text>Duration: 1 hour</Card.Text>
            <Card.Text>Type: Regular Checkup</Card.Text>
            <Button variant="primary" onClick={handleApply}>Cancel</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Schedule;
