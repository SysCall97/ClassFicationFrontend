import React, { useState } from 'react';
import EditDialogue from '../common/EditDialogue';

const ShowComments = ({ comments, setComments, postId, classCode }) => {
    const [openEditDialogue, setOpenEditDialogue] = useState(false);
    const handleCloseEditDialogue = () => {
        setOpenEditDialogue(false);
    };
    const handleOpenEditDialog = () => {
        setOpenEditDialogue(true);
    }
    return (
        <div>
            {
                comments.map(comment => 
                    <div key={comment._id}>
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
                            <div className='action-btn'>Delete</div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default ShowComments;