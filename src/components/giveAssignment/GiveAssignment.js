import React, { useState } from 'react';
import { Button } from '@mui/material';
import DatePicker from 'sassy-datepicker';
import { useDialogHandler } from '../../helpers/useDialogHandler';
import { saveAssignment } from '../../services/class';
import Dialog from '../common/Dialog';

const GiveAssignment = ({ classCode }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [lastDate, setLastDate] = useState(null);

    const [ open, setOpen, title, setTitle, content, setContent, handleDialogClose ] = useDialogHandler();

    const onDateChange = (_date) => {
        const date = new Date(_date);
        setLastDate(date);
    };
    const handleAssign = () => {
        const data = new FormData();
        data.append('file', selectedFile);
        data.append('lastDate', lastDate);
        data.append('type', 'assignment');
        data.append('classCode', classCode);
        
        saveAssignment({classCode, payload: data}).then(res => {
            setTitle("Success");
            setContent(res.data.message);
            setOpen(true);
        });
    }

    return (
        <div className='assignmentSection'>
            <Dialog open={open} handleClose={handleDialogClose} content={content} title={title} />
            <div style={{marginBottom: '4%'}} className='cardName'>Add Assignment</div>
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
            <div style={{marginTop: '10px', marginBottom: '5px',}}>Last Date:</div>
            <div style={{ marginBottom: '10px'}}>
                <DatePicker onChange={onDateChange} />
            </div>
            <Button variant="outlined" color='success' onClick={handleAssign}>Assign</Button>
        </div>
    );
};

export default GiveAssignment;