import React, { useState } from 'react';
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Header(props) {

    return (
        <AppBar position='sticky' elevation={20} color="primary">
            <Toolbar>
                <Typography variant='h3'>Car Rental</Typography>
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
            </Toolbar>
        </AppBar>
    )
}

export default Header