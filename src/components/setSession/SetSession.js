import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useDialogHandler } from '../../helpers/useDialogHandler';
import Dialog from '../common/Dialog';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { create } from '../../services/session';

const SetSession = ({ classCode }) => {
    const [ open, setOpen, title, setTitle, content, setContent, handleDialogClose ] = useDialogHandler();
    const [startDateTimeValue, setStartDateTimeValue] = useState(dayjs(Date.now()));

    const handleStartDateTimeValue = (_date) => {
        const date = new Date(_date);
        setStartDateTimeValue(dayjs(date));
    };

    const handleCreateSession = () => {
        const payload = {
            startDate: startDateTimeValue
        }
        create({payload, classCode}).then(res => {
            setTitle("Success");
            setContent(res.data.message);
            setOpen(true);
        });
    }
    return (
        <>
            <Dialog open={open} handleClose={handleDialogClose} content={content} title={title} />
            <div style={{gridColumn:"5/13"}}>
            <div style={{marginBottom: '10px'}}></div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label="Start date and time"
                        value={startDateTimeValue}
                        onChange={handleStartDateTimeValue}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <div style={{marginBottom: '30px'}}></div>
                <Button variant="outlined" color='success' onClick={handleCreateSession}>Create</Button>
            </div>
        </>
    );
};

export default SetSession;