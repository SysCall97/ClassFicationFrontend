import React, { useEffect, useState } from 'react';
import { getAssignments } from '../../services/class';
import { useDialogHandler } from '../../helpers/useDialogHandler';

import { Button, Select, FormControl, MenuItem } from '@mui/material';
import GiveAssignment from '../giveAssignment/GiveAssignment';
import Dialog from '../common/Dialog';
import AssignmentCard from '../assignmentCard/AssignmentCard';

const Assignment = ({ classCode, type }) => {
    const options = [
        {value: "past", text: "Due"},
        {value: "present", text: "Current"},
        {value: "future", text: "Upcoming"}
    ];
    const [status, setStatus] = useState(options[0].value);
    const [assignments, setAssignments] = useState([]);
    const [page, setPage] = useState(0);
    const [ open, setOpen, title, setTitle, content, setContent, handleDialogClose ] = useDialogHandler();

    const _getAssignments = () => {
        getAssignments({ type, classCode, status, page }).then(val => setAssignments(val.data));
    }

    useEffect(()=>{
        _getAssignments();
    },[]);

    useEffect(()=>{
        setAssignments([]);
        setPage(0);
        getAssignments({ type, classCode, status, page }).then(val => setAssignments(val.data));
    }, [status]);

    const openDialog = () => {
        setContent(() => <GiveAssignment classCode={classCode} close={handleDialogClose} />);
        setTitle("Add Assignment")
        setOpen(true);
    }

    return (
        <>
            <Dialog open={open} handleClose={handleDialogClose} content={content} title={title} />
            <div className='filterWrapper'>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 130, marginRight: 3 }}>
                    <Select
                        sx = {{ textAlign: 'center' }}
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        {
                            options.map(option => <MenuItem value={option.value} key={option.value}>{option.text}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                <Button sx={{marginTop: 0.3}} variant="outlined" color='success' onClick={openDialog}>Add Assignment</Button>
            </div>
            <div className='assignmentWrapper'>
                {
                    !!assignments.length && assignments.map((assignment, index) => <AssignmentCard key={`${status}-${index}`} status={status} assignment={assignment} type={type} />)
                }
            </div>
        </>
    );
};

export default Assignment;