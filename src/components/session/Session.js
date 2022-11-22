import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Dialog from '../common/Dialog';
import { useDialogHandler } from '../../helpers/useDialogHandler';
import SetSession from '../setSession/SetSession';
import { getSessions } from '../../services/session';
import SessionCard from '../sessionCard/SessionCard';
import InfiniteScroll from 'react-infinite-scroll-component';

const Session = ({ classCode, type }) => {
    const [ open, setOpen, title, setTitle, content, setContent, handleDialogClose ] = useDialogHandler();
    const [sessions, setSessions] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const _getSessions = () => {
        getSessions({ classCode, page }).then(val => {
            setHasMore(val.data === 10);
            setPage(prev => prev+1);
            setSessions(val.data.data);
        });
    }

    useEffect(()=>{
        _getSessions();
    }, []);
    
    const openDialog = () => {
        setContent(() => <SetSession classCode={classCode} />);
        setTitle("Book Session")
        setOpen(true);
    }
    return (
        <>
            <Dialog open={open} handleClose={handleDialogClose} content={content} title={title} />
            <div className='filterWrapper'>
                {type === "teachers" && <Button sx={{marginTop: 0.3, left: 180}} variant="outlined" color='success' onClick={openDialog}>Create a session</Button>}
            </div>
            <div className='assignmentWrapper'>
                {
                    !!sessions.length && 
                    <InfiniteScroll
                        dataLength={sessions.length}
                        next={_getSessions}
                        hasMore={hasMore}
                        loader={<div style={{
                            gridColumn:"4/12",
                            textAlign: 'center',
                            marginTop: '15px',
                            color: '#555'
                        }}>Loading...</div>}
                        style={{overflow: "none"}}
                    >
                        {sessions.map((session) => 
                        <SessionCard key={`${session._id}`} session={session} type={type} classCode={classCode} />)}
                    </InfiniteScroll>
                }
            </div>
        </>
    );
};

export default Session;