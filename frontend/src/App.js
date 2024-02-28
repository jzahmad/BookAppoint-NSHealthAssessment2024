// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/login';
import HomePage from './Components/homepage'; // Assuming you have a HomePage component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/homepage" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
