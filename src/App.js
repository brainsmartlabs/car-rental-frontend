import './App.css';
import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home.js';
import Auth from './pages/Auth.js';
import Register from './pages/Register.js';
import BookingCar from './pages/BookingCar.js';

function App() {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <React.Fragment>
      <header className='header'>
        <Header isSignUp={isSignUp} setIsSignUp={setIsSignUp}/>
      </header>
      <main className='main'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth isSignUp={isSignUp} setIsSignUp={setIsSignUp} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/bookingCar" element={<BookingCar />} />
        </Routes>
      </main>
      <footer className='footer'>
        <p>&copy; 2022. Created By Balaji KR. All Rights Reserved</p>
      </footer>
    </React.Fragment>
  );
}

export default App;
