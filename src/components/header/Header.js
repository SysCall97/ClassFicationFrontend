import React, { useContext } from 'react';
import './Header.css'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import { context } from "../../App";
import { signout } from '../../services/auth';
import { deleteAuthTokenFromStorage } from '../../helpers/storages';

const Header = () => {
    const { user } = useContext(context);
    const [loggedinUser, setLoggedinUser] = user;

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
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                    }

                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;