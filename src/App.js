import './App.css';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home.js';
import Auth from './pages/Auth.js';
import Register from './pages/Register.js';
import BookingCar from './pages/BookingCar.js';
import Welcome from './pages/Welcome';

axios.defaults.withCredentials = true;

const userReducer = (state, action) => {
  switch (action.type) {
    case 'USER_FETCH_INIT':
      return { ...state, isLoading: true, isError: false, token: false, data: {} };
    case 'USER_FETCH_SUCCESS':
      return { ...state, isLoading: false, isError: false, token: true, data: action.payload };
    case 'USER_FETCH_FAILURE':
      return { ...state, isLoading: false, isError: true, token: false };
    default:
      throw new Error();
  }
};

function App() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, dispatchUser] = useReducer(userReducer, {
    data: {},
    isLoading: false,
    isError: false,
    token: false,
  });

  console.log('Token exisits & has the user loaded? ' + user.token);
  console.log('Login Status ' + isLoggedIn);

  async function sendUserRequest() {
    const res = await axios.get('http://localhost:3300/api/user/user', {
      withCredentials: true,
    }).catch(err => { throw new Error() });

    let data = null;
    if (!res) data = null;
    if (res && res.hasOwnProperty('data')) data = await res.data;

    return data;
  }


  useEffect(() => {
    //Initial Stage: On Page Load
    dispatchUser({ type: 'USER_FETCH_INIT' });
    setIsLoggedIn(false);

    //Sending User Request: 
    sendUserRequest().then(data => {
      (data) && dispatchUser({
        type: 'USER_FETCH_SUCCESS',
        payload: data.user
      });
      setIsLoggedIn(true);
    }).catch((err) => {
      dispatchUser({ type: 'USER_FETCH_FAILURE' });
      setIsLoggedIn(false);
    });

  }, []);

  useEffect(() => {
    console.log("Second Use Effect");
    if (user.token === true) setIsLoggedIn(true);
    if (user.token === false) setIsLoggedIn(false);
  }, []);

  return (
    <React.Fragment>
      <header className='header'>
        <Header
          isSignUp={isSignUp}
          setIsSignUp={setIsSignUp}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          user={user}
        />
      </header>
      <main className='main'>
        <Routes>
          <Route path="/" element={<Home />}
            isLoggedIn={isLoggedIn} />
          <Route path="/auth" element={<Auth
            isSignUp={isSignUp}
            setIsSignUp={setIsSignUp}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn} />} />

          <Route path="/register" element={<Register />} />
          <Route path="/booking/:id" element={<BookingCar />} />
          <Route path="/getUser" element={<Welcome isLoggedIn={isLoggedIn} />} />
        </Routes>
      </main>
      <footer className='footer'>
        <p>&copy; 2022. Created By Balaji KR. All Rights Reserved</p>
      </footer>
    </React.Fragment>
  );
}

export default App;
