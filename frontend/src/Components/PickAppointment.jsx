import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../Styles/homepage.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/PickApp.css';

function Post() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleApply = () => {
    navigate('/apply');
  };

  // Dummy data for appointments
  const appointments = [
    { hospital: "Hospital 1", duration: "2 hours", type: "General", doctor: "Dr. Smith" },
    { hospital: "Hospital 2", duration: "1 hour", type: "Specialist", doctor: "Dr. Johnson" }
    // Add more dummy data as needed
  ];

  // Filter appointments based on search query
  const filteredAppointments = appointments.filter(appointment =>
    appointment.hospital.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="navbar">
        <h1 className="logo">BookAppoint</h1>
        <nav className="nav-links">
          <Link to="/pick-appointments" className="nav-link">Pick Appointments</Link>
          <Link to="/post-appointment" className="nav-link">Post Appointment</Link>
          <Link to="/your-schedule" className="nav-link">Your Schedule</Link>
        </nav>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Hospital"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="post-container">
        {filteredAppointments.map((appointment, index) => (
          <div key={index} className="post-item">
            <Card className="post-card">
              <Card.Body>
                <Card.Title>{appointment.hospital}</Card.Title>
                <Card.Text>Duration: {appointment.duration}</Card.Text>
                <Card.Text>Type: {appointment.type}</Card.Text>
                <Card.Text>Doctor name: {appointment.doctor}</Card.Text>
                <Button variant="primary" onClick={handleApply}>Apply</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Post;
