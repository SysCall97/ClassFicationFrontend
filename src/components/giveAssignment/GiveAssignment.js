import { Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import DatePicker from 'sassy-datepicker';
import { saveAssignment } from '../../services/class';

const GiveAssignment = ({ classCode }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [lastDate, setLastDate] = useState(null);

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
        
        saveAssignment({classCode, payload: data});
    }

    return (
        <div className='assignmentSection'>
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