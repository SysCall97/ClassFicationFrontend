import React, { useState } from 'react';
import DeleteDialogue from '../common/DeleteDialogue';
import EditDialogue from '../common/EditDialogue';

const ShowComments = ({ comments, setComments, postId, classCode }) => {
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
        <div>
            {
                comments.map(comment => 
                    <div key={comment._id}>
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
                        <div className='cardName' style={{ marginBottom: '5px', fontSize: 'medium' }}>{comment.userName}</div>
                        <div>{comment.comment}</div>
                        <div className='action-wrapper'>
                            <div className='action-btn' onClick={handleOpenEditDialog}>Edit</div>
                            <div className='action-btn' onClick={handleOpenDeleteDialog}>Delete</div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default ShowComments;