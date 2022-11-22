import React from 'react';
import { Button } from '@mui/material';
import Dialog from '../common/Dialog';
import { useDialogHandler } from '../../helpers/useDialogHandler';
import SetSession from '../setSession/SetSession';

const Session = ({ classCode, type }) => {
    const [ open, setOpen, title, setTitle, content, setContent, handleDialogClose ] = useDialogHandler();
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
        </>
    );
};

export default Session;