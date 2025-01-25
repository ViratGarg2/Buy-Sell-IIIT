import './App.css';
import Navbar from './components/Navbar.js'
import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Login from './views/Login.js';
import Signup from './views/Signup.js';
import Search from './views/Search.js';
import Profile from './views/Profile.js';
import Order from './views/Order.js';
import Delivery from './views/Delivery.js';
import Support from './views/Support.js';
import ItemDetails from './views/ItemDetails.js';
import Cart from './views/Cart.js';
import Sell from './views/Sell.js';



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
          <Route path = "/history" element = {<Order/>}/>
          <Route path = "/delivery" element = {<Delivery/>}/>
          <Route path = "/support" element = {<Support/>}/>
          <Route path="/search/:id" element={<ItemDetails />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/sell" element={<Sell/>} />
        </Routes>
      
    </div>
    </Router>
    </>
  );
}

export default App;
