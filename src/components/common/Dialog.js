import React from 'react';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const _Dialog = ({open, handleClose, content, title}) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={true}
            TransitionComponent={Transition}
            keepMounted
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {content}
            </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};

export default _Dialog;