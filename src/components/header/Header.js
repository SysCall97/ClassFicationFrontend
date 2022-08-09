import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import './Header.css'
import { context } from "../../App";
import { signout } from '../../services/auth';
import { deleteAuthTokenFromStorage } from '../../helpers/storages';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Header = () => {
    const { user } = useContext(context);
    const [loggedinUser, setLoggedinUser] = user;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await signout();
        await deleteAuthTokenFromStorage();
        await setLoggedinUser({isLoggedIn: false});
    }
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        ClassFication
                    </Typography>

                    { 
                        !loggedinUser.isLoggedIn && 
                        <Link to="signin">
                            <Button color="inherit">
                                Login
                            </Button>
                        </Link>
                    }
                    {
                        loggedinUser.isLoggedIn && 
                        <div>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <AccountCircleIcon color="primary" fontSize="large" />
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem>
                                    <Link to="dashboard">
                                        Dashboard
                                    </Link>
                                </MenuItem>
                                {
                                    loggedinUser.role !== 1 && 
                                    <MenuItem>
                                        <Link to="class/create">
                                            Create Class
                                        </Link>
                                    </MenuItem>
                                }
                                <MenuItem>
                                    <Link to="class/join">
                                        Join Class
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </div>
                    }

                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;