import './App.css';
import Navbar from './components/Navbar.js'
import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Login from './views/Login.js';
import Signup from './views/Signup.js';
import Search from './views/Search.js';
import Profile from './views/Profile.js';

function App() {
  return (
    <>
    <Router>
      <div>
      <Navbar/>
        <Routes>
          <Route path = "/login" element = {<Login/>}/>
          <Route path = "/signup" element = {<Signup/>}/>
          <Route path = "/search" element = {<Search/>}/>
          <Route path = "/profile" element = {<Profile/>}/>
        </Routes>
      
    </div>
    </Router>
    </>
  );
}

export default App;
