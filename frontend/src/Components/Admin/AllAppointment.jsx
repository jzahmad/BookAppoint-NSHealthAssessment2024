import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function AllAppointments() {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBy, setSearchBy] = useState('hospital'); 
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:80/all`);
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    }
    fetchData();
  }, []);

  // Filter appointments based on search criteria
  const filteredAppointments = appointments.filter(appointment => {
    if (searchQuery === '') return true;
    if (searchBy === 'hospital') {
      return appointment.hospital.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (searchBy === 'duration') {
      return appointment.duration.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (searchBy === 'type') {
      return appointment.type.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (searchBy === 'dateTime') {
      return appointment.dateTime.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return false;
  });

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  return (
    <div>
      <div className="navbar">
        <h1 className="logo">BookAppoint (admin)</h1>
        <nav className="nav-links">
          <Link to="/admin/all-appointments" className="nav-link">All Appointments</Link>
          <Link to="/admin/post-appointment" className="nav-link active">Post Appointment</Link>
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
          <option value="hospital">Hospital</option>
          <option value="duration">Duration</option>
          <option value="type">Type</option>
          <option value="dateTime">Date & Time</option>
        </select>
      </div>
      
      <div className="post-container">
        {filteredAppointments.map((appointment, index) => (
          <div key={index} className="post-item">
            <Card className="post-card">
              <Card.Body>
                <Card.Title>{appointment.hospital}</Card.Title>
                <Card.Text>Duration: {appointment.duration}</Card.Text>
                <Card.Text>Type: {appointment.type}</Card.Text>
                <Card.Text>Date & Time: {appointment.dateTime}</Card.Text>
                <Card.Text>Number of Applicants: {appointment.numberOfApplicants}</Card.Text>
                <Button variant="primary">See Applicants</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllAppointments;
