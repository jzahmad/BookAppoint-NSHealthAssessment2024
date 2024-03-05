// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import AllAppointments from './Components/Admin/AllAppointment';
import HomePage from './Components/Homepage'; 
import Pick from './Components/PickAppointment'; 
import Post from './Components/PostAppointment'; 
import YourSchedule from './Components/YourSchedule'; 
import Apply from './Components/ApplyAppoint';
import CreateAccount from './Components/CreateAccount';
import ForgetPassword from './Components/ForgetPassword';
import { ContextProvider } from './Components/Context';

function App() {
  return (
    <Router>
        <div className="App">
          <ContextProvider>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="admin/all-appointments" element={<AllAppointments />} />
              <Route path="/create" element={<CreateAccount />} />
              <Route path={`/homepage/:userID`} element={<HomePage />} />
              <Route path="/pick-appointments/:userID" element={<Pick />} />
              <Route path="/post-appointment/:userID" element={<Post />} />
              <Route path="/your-schedule/:userID" element={<YourSchedule />} />
              <Route path="/pick-appointments/:userID/apply/:postID" element={<Apply />} />
              <Route path="/forget" element={<ForgetPassword />} />
              <Route path="/admin/all-appointments" element={<AllAppointments />} />
            </Routes>
          </ContextProvider>
        </div>
    </Router>
  );
}

export default App;
