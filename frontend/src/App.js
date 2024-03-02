// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/login';
import HomePage from './Components/homepage'; 
import Pick from './Components/PickAppointment'; 
import Post from './Components/PostAppointment'; 
import YourSchedule from './Components/YourSchedule'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/pick-appointments" element={<Pick />} />
          <Route path="/post-appointment" element={<Post />} />
          <Route path="/your-schedule" element={<YourSchedule />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
