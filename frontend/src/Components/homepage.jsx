import React, {useContext} from 'react';
import { Link } from "react-router-dom";
import '../Styles/homepage.css';
import { context } from './Context';

function Homepage() {

  const { userID } = useContext(context);

  return (
    <aside>
      <div className="navbar">
        <h1 className="logo">BookAppoint</h1>
        <nav className="nav-links">
          <Link to={`/pick-appointments/${userID}`} className="nav-link">Pick Appointments</Link>
          <Link to={`/post-appointment/${userID}`} className="nav-link">Post Appointment</Link>
          <Link to={`/your-schedule/${userID}`} className="nav-link">Your Schedule</Link>
        </nav>
      </div>

      <div className='centered-div'>
        Pick the respective option in nav panel.
      </div>
    </aside>
  );
}

export default Homepage;
