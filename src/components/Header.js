import React from 'react';
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

axios.defaults.withCredentials = true;

function Header(props) {
    const navigate = useNavigate();
    console.log('Inside Props Login & Token: ' + props.isLoggedIn + ' ' + props.isToken);
    console.log(props.user);

    async function handleLogout() {
        const res = await axios.get("http://localhost:3300/api/user/logout", null, {
            withCredentials: true
        });

        if (res.status === 200 && res.data.logout === 'true') {
            props.setIsSignUp(false);
            props.setIsLoggedIn(false);
            props.setIsToken(false);
            navigate('/auth');
        }
    }

    return (
        <AppBar position='sticky' elevation={20} color="primary">
            <Toolbar >
                <Typography variant='h3'>Car Rental</Typography>
                {/*(props.isLoggedIn === true && props.isToken) &&*/}
                    <Typography variant='h6'>
                        {props.isLoggedIn}|{props.isToken} | {props.user.data.profile} | {props.user.data.name} | Balance: {props.user.data.wallet}
                    </Typography>
                
                {(!props.isLoggedIn) &&
                    <Box sx={{ marginLeft: "auto" }}>
                        <Tabs
                            onChange={(e, value) => props.setIsSignUp(value === 1 ? true : false)}
                            value={(props.isSignUp) ? 1 : 0}
                            textColor='inherit'
                            indicatorColor='secondary'>
                            <Tab to="/auth" LinkComponent={Link} label="Login" />
                            <Tab to="/auth" LinkComponent={Link} label="Sign Up" />
                        </Tabs>
                    </Box>
                }

                {(props.isLoggedIn) &&
                    <Box sx={{ marginLeft: "auto" }}>
                        <Tabs
                            value={0}
                            textColor='inherit'
                            indicatorColor='secondary'
                        >
                            <Tab icon={<LogoutOutlinedIcon />}
                                iconPosition="end"
                                onClick={handleLogout}
                                label="Logout" />
                        </Tabs>
                    </Box>
                }
            </Toolbar>
        </AppBar>
    )
}

export default Header