import React from 'react';
import Box from '@mui/material/Box';

const _Box = (props) => {
    return (
        <Box sx={{ maxWidth: 375, boxShadow: 3 }}>
            {props.children}
        </Box>
    );
};

export default _Box;