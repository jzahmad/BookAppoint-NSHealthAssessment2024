import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import '../Styles/homepage.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Schedule.css';

function Schedule() {
  const userID = useParams().userID;
  console.log(userID);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBy, setSearchBy] = useState('hospital');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        console.log(userID);
        const response = await axios.post(`http://localhost:80/schedules`, { userID });
        setAppointments(response.data.schedules);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    }
    fetchAppointments();
  }, [userID]);

  const handleApply = () => {
    navigate('/homepage');
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`;
  };

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
          <option value="hospital">Hospital</option>
          <option value="duration">Duration</option>
          <option value="type">Type</option>
        </select>
      </div>

      <div className="card-container">
        {appointments.map((appointment, index) => (
          <div key={index} className="doctor-card">
            <Card>
              <Card.Body>
                <Card.Text><strong>Hospital:</strong> {appointment.hospital}</Card.Text>
                <Card.Text><strong>Date:</strong> {formatDate(appointment.s_date)}</Card.Text>
                <Card.Text><strong>Time:</strong> {appointment.s_time}</Card.Text>
                <Card.Text><strong>Duration:</strong> {appointment.duration}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Schedule;
