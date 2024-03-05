import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../../Styles/PickApp.css';
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

  const handleApply = async (postId, index) => {
    try {
      const response = await axios.post(`http://localhost:80/applicants`, { postId });
      const updatedAppointments = [...appointments];
      updatedAppointments[index].applicants = response.data.results;
      setAppointments(updatedAppointments);
    } catch (error) {
      console.error('Error fetching applicants:', error);
    }
  };
  

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  return (
    <div>
      <div className="navbar">
        <h1 className="logo">BookAppoint (admin)</h1>
        <nav className="nav-links">
          <Link to={`admin/all-appointments`} className="nav-link">All Appointments</Link>
          <Link to={`admin/post-appointment`} className="nav-link active">Post Appointment</Link>
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
        {appointments.map((appointment, index) => (
          <div key={index} className="post-item">
            <Card className="post-card">
              <Card.Body>
                <Card.Title>{appointment.hospital}</Card.Title>
                <Card.Text>Duration: {appointment.duration}</Card.Text>
                <Card.Text>Type: {appointment.type}</Card.Text>
                <Card.Text>Date & Time: {appointment.dateTime}</Card.Text>
                <Card.Text>Number of Applicants: {appointment.numberOfApplicants}</Card.Text>
                <Button variant="primary" onClick={() => handleApply(appointment.PostID, index)}>See Applicants</Button>
                <ul>
                <br/>
                  {appointment.applicants && appointment.applicants.map((applicant, applicantIndex) => (
                    <li key={applicantIndex}>
                      <strong>Name: </strong> {applicant.name}<br />
                      <strong>Health ID: </strong> {applicant.healthId}<br />
                      <strong>Contact: </strong> {applicant.contact}<br />
                      <strong>Previous: </strong> {applicant.prev}<br />
                      <br />
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllAppointments;
