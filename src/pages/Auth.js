import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useState, useReducer } from 'react';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const errorReducer = (state, action) => {
  switch (action.type) {
    case 'NAME':
      return { ...state, name: true };
    case 'EMAIL':
      return { ...state, email: true };
    case 'PASSWORD':
      return { ...state, password: true };
    case 'PROFILE':
      return { ...state, profile: true };
    case 'RESET':
      return { name: false, email: false, password: false, profile: false };
    default:
      throw new Error();
  }
};



function Auth(props) {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    profile: "",
  });

  const [errorState, dispatchErrorState] = useReducer(errorReducer, {
    name: false,
    email: false,
    password: false,
    profile: false
  });

  function resetState() {
    props.setIsSignUp(!props.isSignUp);
    setInputs({ name: '', email: '', password: '', profile: '' });
    dispatchErrorState({ type: 'RESET' });
  }

  function handleChange(e) {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    dispatchErrorState({ type: 'RESET' });
  }

  async function sendRequest() {
    if (props.isSignUp) {
      const res = await axios.post('http://localhost:3300/api/user/signup', {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
        profile: inputs.profile
      }).catch(err => console.log(err));

      let data = await res.data;
      return data;
    }

    else {
      const res = await axios.post('http://localhost:3300/api/user/login', {
        email: inputs.email,
        password: inputs.password
      }).catch(err => console.log(err));

      let data = await res.data;
      return data;
    }

  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(errorState); //Debug

    if (props.isSignUp) {
      if (inputs.name === '') dispatchErrorState({ type: 'NAME' });
      if (inputs.email === '') dispatchErrorState({ type: 'EMAIL' });
      if (inputs.password === '') dispatchErrorState({ type: 'PASSWORD' });
      if (inputs.profile === '') dispatchErrorState({ type: 'PROFILE' });
    }
    else {
      if (inputs.email === '') dispatchErrorState({ type: 'EMAIL' });
      if (inputs.password === '') dispatchErrorState({ type: 'PASSWORD' });
    }

    console.log(errorState); //Debug
    
    if (!errorState.name && !errorState.email && !errorState.password && !errorState.profile) {
      console.log("Condition validated & Request is sending");
      sendRequest().then((data) => {
        if (props.isSignUp) {
          if (data.status === 'not-allow') navigate('/getUser');
        }
        else {
          if (data.status === 'allow') navigate('/getUser');
        }
      });
    } else {
      console.log("Request Not Sent");
    }

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          margin={'auto'}
          flexDirection={'column'}
          borderRadius={5}
          maxWidth={400}
          padding={3}
          boxShadow={"5px 5px 10px #ccc"}
          alignItems="center"
          marginTop={5}
          sx={{ ":hover": { boxShadow: '10px 10px 20px #ccc' } }}
        >

          <Typography
            variant='h3'
            padding={3}
            textAlign={'center'}> {props.isSignUp ? 'Sign Up' : 'Login'} </Typography>

          {props.isSignUp &&
            <TextField
              margin='normal'
              fullWidth
              name='name'
              type={'text'}
              variant='outlined'
              label="Name"
              value={inputs.name}
              onChange={handleChange}
              error={errorState.name}
            />}

          <TextField
            margin='normal'
            fullWidth
            name='email'
            type={'email'}
            variant='outlined'
            label="Email"
            value={inputs.email}
            onChange={handleChange}
            error={errorState.email}
          />

          <TextField
            margin='normal'
            fullWidth
            name='password'
            type={'password'}
            variant='outlined'
            label="Password"
            value={inputs.password}
            onChange={handleChange}
            error={errorState.password}
          />
          {props.isSignUp &&
            <FormControl id="profile" margin='normal' fullWidth error={errorState.profile}>
              <InputLabel>I am an</InputLabel>
              <Select
                name="profile"
                id="profile-select"
                labelId="profile"
                label="I am an"
                onChange={handleChange}
                value={inputs.profile}
              >
                <MenuItem value={"admin"}>Admin</MenuItem>
                <MenuItem value={"owner"}>Owner</MenuItem>
                <MenuItem value={"customer"}>Customer</MenuItem>
              </Select>
              <FormHelperText>Choose a Suitable Role</FormHelperText>
            </FormControl>
          }

          <Button
            endIcon={props.isSignUp ? <HowToRegOutlinedIcon /> : <LoginOutlinedIcon />}
            sx={{ marginTop: 3, borderRadius: 3 }}
            variant='contained'
            color='warning'
            type='submit'
          >
            {props.isSignUp ? 'Register' : 'Login'}
          </Button>

          <Button
            endIcon={props.isSignUp ? <LoginOutlinedIcon /> : <HowToRegOutlinedIcon />}
            sx={{ marginTop: 3, borderRadius: 3, fontSize: 'large', textTransform: "none" }}
            onClick={resetState}
          >
            {props.isSignUp ? 'Change to Login' : 'Change to Sign Up'}
          </Button>
        </Box>
      </form>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  )
}

export default Auth;