import React, { useState } from 'react';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import LinearProgress from '@mui/material/LinearProgress';

import Box from '../common/Box';
import Textfield from '../common/Textfield';
import { signup } from '../../services/user';
import {useHandleAuth} from '../../helpers/useHandleAuth';
import { isValidEmail, isValidPassword, isValidUsername } from '../../helpers/validation';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [loading, setLoading] = useState(false);

    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [roleError, setRoleError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setconfirmPasswordError] = useState(false);

    const [role, setRole] = useState(1);

    const handleAuth = useHandleAuth();

    const roles = {
        Teacher: 1,
        Student: 2,
    };

    const handleChange = (e) => {
        setRole(e.target.value);
        setRoleError(false);
    };
    const handleSetUsername = (e) => {
        if(isValidUsername(e.target.value)) {
            setUsername(e.target.value);
            setUsernameError(false);
        } else {
            setUsernameError(true);
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
    const handleSetConfirmedPassword = (e) => {
        const _password = e.target.value;
        if(isValidPassword(_password) && password === _password) {
            setConfirmPassword(_password);
            setconfirmPasswordError(false);
        } else {
            setconfirmPasswordError(true);
        }
    };

    const getPayload = () => {
        console.log({ name: username, email, role, password })
        if(isValidEmail(email) && 
            isValidPassword(password) && 
            isValidUsername(username) && 
            password === confirmPassword &&
            Object.values(roles).includes(role))
            return { name: username, email, role, password };
        else {
            setEmailError(!isValidEmail(email));
            setPasswordError(!isValidPassword(password));
            setUsernameError(!isValidUsername(username));
            setconfirmPasswordError(!(isValidPassword(confirmPassword) && password === confirmPassword));
            setRoleError(!Object.values(roles).includes(role));
            return null;
        }
    };

    const handleSignUp = async () => {
        const payload = getPayload();
        if(!!payload) {
            handleAuth(payload, signup, setLoading);
        }
    };
    const _marginTop = { marginTop: "15px" };
    return (
        <div className='boxWrapper'>
            <Box>
                {loading && <LinearProgress />}
                <Card variant="outlined">
                    <CardContent>

                        <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
                            Sign Up
                        </Typography>

                        <Textfield label="Username" handleBlur={handleSetUsername} type="text" />
                        {usernameError && <span className='errorText'>Enter valid username</span>}

                        <Textfield label="Email" handleBlur={handleSetEmail} style={_marginTop} type="text" />
                        {emailError && <span className='errorText'>Enter valid email</span>}

                        <FormControl fullWidth required style={_marginTop} sx={{ minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-required-label">Role</InputLabel>
                            <Select
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                value={role}
                                label="Role *"
                                onChange={handleChange}
                            >
                                {Object.entries(roles).map(([key, value]) => <MenuItem value={value} key={value}>{key}</MenuItem>)}
                            </Select>
                            {roleError && <span className='errorText'>Role required</span>}
                        </FormControl>

                        <Textfield label="Password" handleBlur={handleSetPassword} style={_marginTop} type="password" />
                        {passwordError && <span className='errorText'>Enter valid password</span>}
                        
                        <Textfield label="Confirm Password" handleBlur={handleSetConfirmedPassword} style={_marginTop} type="password" />
                        {confirmPasswordError && <span className='errorText'>Confirm password must be same as password</span>}

                        <Button variant="contained" onClick={handleSignUp} fullWidth style={_marginTop}>Sign up</Button> 

                    </CardContent>
                </Card>
            </Box>
        </div>
    );
};

export default Signup;