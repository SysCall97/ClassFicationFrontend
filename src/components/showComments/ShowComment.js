import { Divider } from '@mui/material';
import React, { useContext, useState } from 'react';
import { context } from '../../App';
import DeleteDialogue from '../common/DeleteDialogue';
import EditDialogue from '../common/EditDialogue';

const ShowComment = ({setComments, postId, classCode, comment, comments}) => {
    const { user } = useContext(context);
    const [loggedinUser, setLoggedinUser] = user;
    const [openEditDialogue, setOpenEditDialogue] = useState(false);
    const [openDeleteDialogue, setOpenDeleteDialogue] = useState(false);

    const handleCloseEditDialogue = () => {
        setOpenEditDialogue(false);
    };
    const handleCloseDeleteDialogue = () => {
        setOpenDeleteDialogue(false);
    };
    const handleOpenEditDialog = () => {
        setOpenEditDialogue(true);
    }
    const handleOpenDeleteDialog = () => {
        setOpenDeleteDialogue(true);
    }
    return (
        <div key={comment._id} style={{marginBottom: "12px"}}>
            <DeleteDialogue 
                open={openDeleteDialogue} 
                handleClose={handleCloseDeleteDialogue} 
                type="comment" 
                postId={postId} 
                classCode={classCode} 
                commentId={comment._id}
                posts={comments} 
                setPosts={setComments} />

            <EditDialogue 
                open={openEditDialogue} 
                content={comment.comment} 
                handleClose={handleCloseEditDialogue} 
                type="comment" 
                postId={postId} 
                classCode={classCode} 
                posts={comments} 
                commentId={comment._id}
                setPosts={setComments} />
            <div className='cardName' style={{ marginBottom: '1px', fontSize: 'medium' }}>{comment.userName}</div>
            <div>{comment.comment}</div>
            {comment.uid === loggedinUser.uid && <div className='action-wrapper'>
                <div className='action-btn' onClick={() => handleOpenEditDialog()}>Edit</div>
                <div className='action-btn' onClick={() => handleOpenDeleteDialog()}>Delete</div>
            </div>}
            <Divider />
        </div>
    );
};

export default ShowComment;