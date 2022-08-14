import React, { useContext, useState } from 'react';
import ShowComment from './ShowComment';

const ShowComments = ({ comments, setComments, postId, classCode }) => {
    return (
        <div>
            {
                comments.map(comment => 
                    <ShowComment key={comment._id} setComments={setComments} postId={postId} classCode={classCode} comment={comment} comments={comments} />
                )
            }
        </div>
    );
};

export default ShowComments;