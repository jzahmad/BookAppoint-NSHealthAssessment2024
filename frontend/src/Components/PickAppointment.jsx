import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../Styles/PickApp.css';
import axios from 'axios';


function Post() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBy, setSearchBy] = useState('hospital'); 
  const [appointments, setAppointments] = useState([]);

  const navigate=useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:80/pick");
        setAppointments(response.data.results);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    }
    fetchData();
  }, []);

  const handleApply = () => {
    navigate("/apply")
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
          <Link to="/pick-appointments" className="nav-link">Pick Appointments</Link>
          <Link to="/post-appointment" className="nav-link">Post Appointment</Link>
          <Link to="/your-schedule" className="nav-link">Your Schedule</Link>
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
