import React, { useState } from 'react';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';

import Box from '../common/Box';
import Dialog from '../common/Dialog';
import Textfield from '../common/Textfield';
import { join } from '../../services/class';

const JoinClass = () => {
    const [title, setTitle] = useState("");
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [classCode, setClassCode] = useState("");
    const [classCodeError, setClassCodeError] = useState(false);

    const _marginTop = { marginTop: "15px" };

    const getPayload = () => {
        if(!!classCode && classCode.length > 0) {
            return classCode;
        }
        setClassCodeError(true);
        return null;
    }
    const handleClose = () => {
        setOpen(false);
        setContent("");
        setTitle("");
    };
    const handleSetClassCode = (e) => {
        const _classCode = e.target.value;
        if(!!_classCode && _classCode.length > 0) {
            setClassCode(_classCode);
            setClassCodeError(false);
        } else {
            setClassCodeError(true);
        }
    };
    const handleCreateClass = async () => {
        const payload = getPayload();
        setLoading(true);
        if(!!payload) {
            try {
                const response = await join(payload);
                setLoading(false);
                setTitle(response.statusText);
                setContent(`You've joined ${response.data.className} class successfully!`);
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
                            Join Class
                        </Typography>

                        <Textfield label="Class Code" handleBlur={handleSetClassCode} style={null} type="text" />
                        {classCodeError && <span className='errorText'>Set valid class name</span>}

                        <Button variant="contained" onClick={handleCreateClass} fullWidth style={_marginTop}>Join Class</Button> 

                    </CardContent>
                </Card>
            </Box>
        </div>
    );
};

export default JoinClass;