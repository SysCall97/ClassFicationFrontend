import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';

import Box from '../common/Box';
import Dialog from '../common/Dialog';
import Textfield from '../common/Textfield';
import { signin } from '../../services/auth';
import {useHandleAuth} from '../../helpers/useHandleAuth';
import { isValidEmail, isValidPassword } from '../../helpers/validation';

const Signin = () => {
    const [title, setTitle] = useState("");
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState(null);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState(null);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleAuth = useHandleAuth();
    const _marginTop = { marginTop: "15px" };

    const getPayload = () => {
        if(isValidEmail(email) && isValidPassword(password)) return { email, password };
        else {
            setEmailError(!isValidEmail(email));
            setPasswordError(!isValidPassword(password));
            return null;
        }
    };
    const handleSetEmail = (e) => {
        const _email = e.target.value;
        if(isValidEmail(_email)) {
            setEmail(_email);
            setEmailError(false);
        } else {
            setEmailError(true);
        }
    };
    const handleSetPassword = (e) => {
        const _password = e.target.value;
        if(isValidPassword(_password)) {
            setPassword(_password);
            setPasswordError(false);
        } else {
            setPasswordError(true);
        }
    };
    const handleClose = () => {
        setOpen(false);
        setContent("");
        setTitle("");
    };
    const handleLogIn = async () => {
        const payload = getPayload();
        if(!!payload) {
            const status = await handleAuth(payload, signin, setLoading);
            if(!status.isSuccess) {
                setTitle(status.title)
                setContent(status.message);
                setOpen(true);
            }
        }
    };

    return (
        <div className='boxWrapper'>
            <Dialog open={open} handleClose={handleClose} content={content} title={title} />
            <Box>
                {loading && <LinearProgress />}
                <Card variant="outlined">
                    <CardContent>

                        <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
                            Sign In
                        </Typography>

                        <Textfield label="Email" handleBlur={handleSetEmail} style={null} type="text" />
                        {emailError && <span className='errorText'>Enter valid email</span>}

                        <Textfield label="Password" handleBlur={handleSetPassword} style={_marginTop} type="password" />
                        {passwordError && <span className='errorText'>Enter valid password</span>}

                        <Button variant="contained" onClick={handleLogIn} fullWidth style={_marginTop}>Log in</Button> 
                        <Link to="../signup">
                            <Button variant="contained" color="success" fullWidth style={_marginTop}>
                                Create new account
                            </Button>
                        </Link>

                    </CardContent>
                </Card>
            </Box>
        </div>
    );
};

export default Signin;