import React, { useEffect, useState } from 'react';
import { getAssignments } from '../../services/class';
import { useDialogHandler } from '../../helpers/useDialogHandler';

import { Button, Select, FormControl, MenuItem } from '@mui/material';
import GiveAssignment from '../giveAssignment/GiveAssignment';
import Dialog from '../common/Dialog';
import AssignmentCard from '../assignmentCard/AssignmentCard';
import InfiniteScroll from 'react-infinite-scroll-component';

const Assignment = ({ classCode, type }) => {
    const options = [
        {value: "past", text: "Due"},
        {value: "present", text: "Current"},
        {value: "future", text: "Upcoming"}
    ];
    const [status, setStatus] = useState(options[0].value);
    const [assignments, setAssignments] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [ open, setOpen, title, setTitle, content, setContent, handleDialogClose ] = useDialogHandler();

    const _getAssignments = () => {
        getAssignments({ type, classCode, status, page }).then(val => {
            setHasMore(val.data === 10);
            setPage(prev => prev+1);
            setAssignments(val.data);
        });
    }

    useEffect(()=>{
        _getAssignments();
    }, [status]);
    const changeStatus = e => {
        setAssignments([]);
        setPage(prev => prev-prev);
        setStatus(e.target.value);
    }

    const openDialog = () => {
        setContent(() => <GiveAssignment classCode={classCode} />);
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
                        onChange={(e) => changeStatus(e)}
                    >
                        {
                            options.map(option => <MenuItem value={option.value} key={option.value}>{option.text}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                {type === "teachers" && <Button sx={{marginTop: 0.3}} variant="outlined" color='success' onClick={openDialog}>Add Assignment</Button>}
            </div>
            <div className='assignmentWrapper'>
                {
                    !!assignments.length && 
                    <InfiniteScroll
                        dataLength={assignments.length}
                        next={_getAssignments}
                        hasMore={hasMore}
                        loader={<div style={{
                            gridColumn:"4/12",
                            textAlign: 'center',
                            marginTop: '15px',
                            color: '#555'
                        }}>Loading...</div>}
                        style={{overflow: "none"}}
                    >
                        {assignments.map((assignment, index) => 
                        <AssignmentCard key={`${status}-${index}`} status={status} assignment={assignment} type={type} />
                        )}
                    </InfiniteScroll>
                }
            </div>
        </>
    );
};

export default Assignment;