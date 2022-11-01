import './App.css';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Header from './components/Header';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import BookingCar from './pages/BookingCar.js';


function App() {
  return (
    <React.Fragment>
      <header className='header'>
        <Header />
      </header>
      <main className='main'>
        <Routes>
          <Route path="/"  element={<Home/>}/>
          <Route path="/login"  element={<Login />}/>
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
