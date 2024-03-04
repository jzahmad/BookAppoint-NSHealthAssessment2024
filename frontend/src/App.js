// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import HomePage from './Components/Homepage'; 
import Pick from './Components/PickAppointment'; 
import Post from './Components/PostAppointment'; 
import YourSchedule from './Components/YourSchedule'; 
import Apply from './Components/ApplyAppoint';
import CreateAccount from './Components/CreateAccount';
import ForgetPassword from './Components/ForgetPassword';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create" element={<CreateAccount />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/pick-appointments" element={<Pick />} />
          <Route path="/post-appointment" element={<Post />} />
          <Route path="/your-schedule" element={<YourSchedule />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/forget" element={<ForgetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
