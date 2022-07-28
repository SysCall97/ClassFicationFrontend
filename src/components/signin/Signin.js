import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { isValidEmail, isValidPassword } from '../../helpers/validation';
import { signin } from '../../services/auth';
import { Link } from 'react-router-dom';
import Box from '../common/Box';
import Textfield from '../common/Textfield';
import LinearProgress from '@mui/material/LinearProgress';

const Signin = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSetEmail = (e) => {
        const _email = e.target.value;
        if(isValidEmail(_email)) {
            setEmail(_email);
            setEmailError(false);
        } else {
            setEmailError(true);
        }
    }
    const handleSetPassword = (e) => {
        const _password = e.target.value;
        if(isValidPassword(_password)) {
            setPassword(_password);
            setPasswordError(false);
        } else {
            setPasswordError(true);
        }
    }

    const getPayload = () => {
        if(isValidEmail(email) && isValidPassword(password)) return { email, password };
        else {
            setEmailError(!isValidEmail(email));
            setPasswordError(!isValidPassword(password));
            return null;
        }
    }

    const handleLogIn = async () => {
        const payload = getPayload();
        if(!!payload) {
            setLoading(true);
            const data = await signin(payload);
            setLoading(false);
            console.log(data.data);
        }
    }
    const _marginTop = {
        marginTop: "15px"
    };
    return (
        <div className='boxWrapper'>
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