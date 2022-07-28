import React from 'react';
import TextField from '@mui/material/TextField';

const Textfield = (props) => {
    return (
        <TextField
            required
            label={props.label}
            variant="filled"
            autoComplete={props.label}
            fullWidth 
            onBlur={props.handleBlur}
            style={props.style}
            type={props.type}
        />

    );
};

export default Textfield;