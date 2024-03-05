import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../Styles/homepage.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Schedule.css';
import { context } from './Context';

function Schedule() {

  const { userID } = useContext(context);

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBy, setSearchBy] = useState('doctor'); // Default search by doctor
  
  const handleApply = () => {
    navigate('/homepage');
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  // Dummy data for appointments
  const appointments = [
    
    { doctor: "John Doe", hospital: "City Hospital", duration: "1 hour", type: "Regular Checkup" }

  ];

  // Filter appointments based on search query and search by option
  const filteredAppointments = appointments.filter(appointment =>
    appointment[searchBy].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="navbar">
        <h1 className="logo">BookAppoint</h1>
        <nav className="nav-links">
          <Link to={`/pick-appointments/${userID}`} className="nav-link">Pick Appointments</Link>
          <Link to={`/post-appointment/${userID}`} className="nav-link">Post Appointment</Link>
          <Link to={`/your-schedule/${userID}`} className="nav-link">Your Schedule</Link>
        </nav>
      </div>

      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder={`Search by ${searchBy}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select className="search-select" value={searchBy} onChange={handleSearchByChange}>
          <option value="doctor">Doctor</option>
          <option value="hospital">Hospital</option>
          <option value="duration">Duration</option>
          <option value="type">Type</option>
        </select>
      </div>

      <div className="card-container">
        {filteredAppointments.map((appointment, index) => (
          <div key={index} className="doctor-card">
            <Card>
              <Card.Body>
                <Card.Text>Dr. Name: {appointment.doctor}</Card.Text>
                <Card.Text>Hospital: {appointment.hospital}</Card.Text>
                <Card.Text>Duration: {appointment.duration}</Card.Text>
                <Card.Text>Type: {appointment.type}</Card.Text>
                <Button variant="primary" onClick={handleApply}>Back To Trade</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Schedule;
