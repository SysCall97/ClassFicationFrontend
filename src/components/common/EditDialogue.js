import React, { useState } from 'react';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Button } from '@mui/material';
import { updateComment, updatePost } from '../../services/class';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const EditDialogue = ({open, handleClose, type, classCode, postId, posts, setPosts, content, commentId}) => {
    const [newContent, setNewContent] = useState(content);
    const editPost = () => {
        const _newContent = document.getElementById(`editPostContent-${postId}`).value;
            const payload = {
                post: _newContent
            };
            updatePost({classCode, postId, payload}).then(res => {
                const _posts = posts;
                for(let i = 0; i < _posts.length; i++) {
                    if(_posts[i]._id === postId) {
                        _posts[i].post = _newContent;
                        break;
                    }
                }
                setPosts([..._posts]);
                handleClose();
            });
    }
    const editComment = () => {
        const _newContent = document.getElementById(`editCommentContent-${commentId}`).value;
            const payload = {
                comment: _newContent
            };
            updateComment({classCode, postId, payload, commentId}).then(res => {
                const _comments = posts;
                for(let i = 0; i < _comments.length; i++) {
                    if(_comments[i]._id === commentId) {
                        _comments[i].comment = _newContent;
                        break;
                    }
                }
                setPosts([..._comments]);
                handleClose();
            });
    }
    const handleEdit = () => {
        if(type === "post") {
            editPost();
        }
        if(type === "comment") {
            editComment();
        }
    };
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
                {type === "post" && <DialogTitle> Edit Post </DialogTitle>}
                {type === "comment" && <DialogTitle> Edit Comment </DialogTitle>}
                <DialogContent>
                    {type === "post" && <TextareaAutosize
                        id={`editPostContent-${postId}`}
                        minRows={5}
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        placeholder="Update about this class"
                        style={{ width: '95%', marginTop: '10px', marginBottom: '10px' }}
                    />}
                    {type === "comment" && <TextareaAutosize
                        id={`editCommentContent-${commentId}`}
                        minRows={5}
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        placeholder="Update about this class"
                        style={{ width: '95%', marginTop: '10px', marginBottom: '10px' }}
                    />}
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleEdit}>Edit</Button>
                    <Button onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EditDialogue;