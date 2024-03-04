import React from 'react';
import { Link } from "react-router-dom";
import '../Styles/homepage.css';

function Homepage() {
  return (
    <aside>
      <div className="navbar">
        <h1 className="logo">BookAppoint</h1>
        <nav className="nav-links">
          <Link to="/pick-appointments" className="nav-link">Pick Appointments</Link>
          <Link to="/post-appointment" className="nav-link">Post Appointment</Link>
          <Link to="/your-schedule" className="nav-link">Your Schedule</Link>
        </nav>
      </div>

      <div>
        Pick the respective option in nav panel.
      </div>
    </aside>
  );
}

export default Homepage;
