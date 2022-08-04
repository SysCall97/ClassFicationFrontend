import React, { useState } from 'react';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';

import Box from '../common/Box';
import Dialog from '../common/Dialog';
import Textfield from '../common/Textfield';
import { create } from '../../services/class';

const CreateClass = () => {
    const [title, setTitle] = useState("");
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [className, setClassName] = useState("");
    const [classNameError, setClassNameError] = useState(false);

    const _marginTop = { marginTop: "15px" };

    const getPayload = () => {
        if(!!className && className.length > 0) {
            return { className };
        }
        setClassNameError(true);
        return null;
    }
    const handleClose = () => {
        setOpen(false);
        setContent("");
        setTitle("");
    };
    const handleSetClassName = (e) => {
        const _className = e.target.value;
        if(!!_className && _className.length > 0) {
            setClassName(_className);
            setClassNameError(false);
        } else {
            setClassNameError(true);
        }
    };
    const handleCreateClass = async () => {
        const payload = getPayload();
        setLoading(true);
        if(!!payload) {
            try {
                const response = await create(payload);
                setLoading(false);
                setTitle(response.statusText);
                setContent(`${className} has been created successfully. \nClassCode: ${response.data.classCode}`);
                setOpen(true);
            } catch (error) {
                setLoading(false);
                setTitle(error.response.statusText);
                setContent(error.response.data.message);
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
                            Create Class
                        </Typography>

                        <Textfield label="Class Name" handleBlur={handleSetClassName} style={null} type="text" />
                        {classNameError && <span className='errorText'>Set valid class name</span>}

                        <Button variant="contained" onClick={handleCreateClass} fullWidth style={_marginTop}>Create Class</Button> 

                    </CardContent>
                </Card>
            </Box>
        </div>
    );
};

export default CreateClass;