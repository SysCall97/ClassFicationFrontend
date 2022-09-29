import React, { useState } from 'react';
import _Dialog from '../common/Dialog';
import { Button } from '@mui/material';
import { submitAssignment } from '../../services/class';
import Dialog from '../common/Dialog';
import { useDialogHandler } from '../../helpers/useDialogHandler';

const SubmitAssignment = ({classCode, assignmentId}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [ open, setOpen, title, setTitle, content, setContent, handleDialogClose ] = useDialogHandler();

    const getPayload = () => {
        const data = new FormData();
        if(!selectedFile) {
            return [data, false];
        }
        data.append('file', selectedFile);

        return [data, true];
    }

    const handleSubmit = () => {
        const [payload, flag] = getPayload();
        if(flag) {
            submitAssignment({
                payload,
                classCode,
                assignmentId
            }).then(res => {
                setSelectedFile(null);
                setTitle("Success");
                setContent(res.data.message);
                setOpen(true);
            });
        }
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
                <div style={{marginBottom: '30px'}}></div>
                <Button variant="contained" color='success' onClick={handleSubmit}>Submit</Button>
            </div>
        </>
    );
};

export default SubmitAssignment;