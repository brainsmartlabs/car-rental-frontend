import './App.css';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Header from './components/Header';


function App() {
  return (
    <React.Fragment>
      <header className='header'>
        <Header />
      </header>
      <main className='main'>
        <Routes>
          <Route path="/"  />
          <Route path="/login"  />
          <Route path="/register"  />
          <Route path="/car"  />
        </Routes>
      </main>
      <footer className='footer'>
        <p>&copy; 2022. Created By Balaji KR. All Rights Reserved</p>
      </footer>
    </React.Fragment>
  );
}

export default App;
