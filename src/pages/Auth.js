import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';


function Auth(props) {

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    profile: "",
  });

  function resetState() {
    props.setIsSignUp(!props.isSignUp);
    setInputs({ name: '', email: '', password: '', profile: '' });
  }

  function handleChange(e) {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(inputs);
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
              required
              name='name'
              type={'text'}
              variant='outlined'
              label="Name"
              value={inputs.name}
              onChange={handleChange}
            />}

          <TextField
            margin='normal'
            fullWidth
            required
            name='email'
            type={'email'}
            variant='outlined'
            label="Email"
            value={inputs.email}
            onChange={handleChange}
          />

          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            type={'password'}
            variant='outlined'
            label="Password"
            value={inputs.password}
            onChange={handleChange}
          />
          {props.isSignUp &&
            <FormControl id="profile" margin='normal' fullWidth required>
              <InputLabel>I am an</InputLabel>
              <Select
                name="profile"
                id="profile-select"
                labelId="profile"
                label="I am an"
                onChange={handleChange}
                value={inputs.profile}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value={"admin"}>Admin</MenuItem>
                <MenuItem value={"owner"}>Owner</MenuItem>
                <MenuItem value={"customer"}>Customer</MenuItem>
              </Select>
              <FormHelperText>Choose A Role</FormHelperText>
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