import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useDialogHandler } from '../../helpers/useDialogHandler';
import { saveAssignment } from '../../services/class';
import Dialog from '../common/Dialog';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const GiveAssignment = ({ classCode }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const [ open, setOpen, title, setTitle, content, setContent, handleDialogClose ] = useDialogHandler();
    const [startDateTimeValue, setStartDateTimeValue] = useState(dayjs(Date.now()));
    const [endDateTimeValue, setEndDateTimeValue] = useState(dayjs(Date.now()));
    const [assignmentTitle, setAssignmentTitle] = useState('');

    const handleStartDateTimeValue = (_date) => {
        const date = new Date(_date);
        setStartDateTimeValue(dayjs(date));
    };

    const handleEndDateTimeValue = (_date) => {
        const date = new Date(_date);
        setEndDateTimeValue(dayjs(date));
    };

    const getPayload = () => {
        let flag = true;
        const data = new FormData();
        data.append('file', selectedFile);
        data.append('startDate', startDateTimeValue);
        data.append('lastDate', endDateTimeValue);
        data.append('type', 'assignment');
        data.append('classCode', classCode);
        data.append('title', assignmentTitle);

        if(!assignmentTitle || assignmentTitle.length === 0) {
            flag = false;
            setTitle("Field required");
            setContent("Please fill the assignment name field");
            setOpen(true);
        }

        return [data, flag];
    }

    const handleAssign = () => {
        const [payload, flag] = getPayload();
        
        if(flag)
        saveAssignment({classCode, payload}).then(res => {
            setSelectedFile(null);
            setAssignmentTitle('');
            setTitle("Success");
            setContent(res.data.message);
            setOpen(true);
        });
    }

    return (
        <>
            <Dialog open={open} handleClose={handleDialogClose} content={content} title={title} />
            <div style={{gridColumn:"5/13"}}>
                <div style={{marginBottom: '30px'}}>
                <button className="file_upload" type="button">
                    <span className="btn_lbl">Browse</span>
                    <span className="btn_colorlayer"></span>
                    <input 
                        type="file" 
                        name="fileupload" 
                        id="file_upload"
                        onChange={(e) => setSelectedFile(e.target.files[0])} 
                    />
                </button>
                </div>
                <TextField 
                    style={{marginBottom: '30px'}} 
                    id="outlined-basic" 
                    label="Assignment title" 
                    variant="outlined"
                    value={assignmentTitle ?? ""}
                    inputProps={{ maxLength: 30 }}
                    onChange={(e) => setAssignmentTitle(e.target.value ?? '')}
                />
                <br/>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label="Start date and time"
                        value={startDateTimeValue}
                        onChange={handleStartDateTimeValue}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <div style={{marginBottom: '30px'}}></div>
                    <DateTimePicker
                        label="End date and time"
                        value={endDateTimeValue}
                        onChange={handleEndDateTimeValue}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <div style={{marginBottom: '30px'}}></div>
                <Button variant="outlined" color='success' onClick={handleAssign}>Assign</Button>
            </div>
        </>
    );
};

export default GiveAssignment;