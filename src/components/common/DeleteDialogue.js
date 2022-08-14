import React from 'react';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Button } from '@mui/material';
import { deleteComment, deletePost } from '../../services/class';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const DeleteDialogue = ({open, handleClose, type, classCode, postId, posts, setPosts, commentId}) => {
    const handleDelete = () => {
        if(type === "post") {
            deletePost({classCode, postId}).then(res => {
                const _posts = posts.filter(p => p._id !== postId);
                setPosts(_posts);
                handleClose();
            })
        }
        if(type === "comment") {
            deleteComment({classCode, postId, commentId}).then(res => {
                const _comments = posts.filter(p => p._id !== commentId);
                setPosts(_comments);
                handleClose();
            });
        }
    }
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle style={{color: 'red'}}>
                    Delete Alert
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this {type}?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
                    <Button onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeleteDialogue;