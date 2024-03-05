import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../Styles/PickApp.css';
import axios from 'axios';
import { context } from './Context';

function Pick() {

  const userID  = useParams()
  const id=userID.userID;
  console.log(id);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBy, setSearchBy] = useState('hospital'); 
  const [appointments, setAppointments] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(`http://localhost:80/pick`, { id }); // Send userID in the request body
        setAppointments(response.data.results);
        console.log(response.data.results);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    }
    fetchData();
  }, []); // Fetch data whenever userId changes
  

  const handleApply = (postID) => {
    // Check if userID is available before navigating
    if (userID) {
      navigate(`/pick-appointments/${id}/apply/${postID}`);
    } else {
      console.error("userID is not available.");
      // Handle the case where userID is not available
    }
  };
  

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  // Filter appointments based on search query and search by option
  const filteredAppointments = appointments.filter(appointment =>
    appointment[searchBy].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="navbar">
        <h1 className="logo">BookAppoint</h1>
        <nav className="nav-links">
          <Link to={`/pick-appointments/${id}`} className="nav-link">Pick Appointments</Link>
          <Link to={`/post-appointment/${id}`} className="nav-link">Post Appointment</Link>
          <Link to={`/your-schedule/${id}`} className="nav-link">Your Schedule</Link>
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
                <Button variant="primary" onClick={() => handleApply(appointment.PostID)}>Apply</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pick;