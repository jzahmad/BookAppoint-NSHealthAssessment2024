// Post.js
import React from 'react';
import { Link } from "react-router-dom";
import '../Styles/homepage.css'; // Ensure correct path to your CSS file

function Post() {
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
      <div>
        Pick content goes here
      </div>
    </div>
  );
}

export default Post;
