import React from 'react';
import './Header.css'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        ClassFication
                    </Typography>
                    <Link to="signin">
                        <Button color="inherit">
                            Login
                        </Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;