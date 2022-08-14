import React from 'react';

const ShowComments = ({ comments, setComments }) => {
    console.log(comments)
    return (
        <div>
            {
                comments.map(comment => 
                    <div key={comment._id}>
                        <div className='cardName' style={{ marginBottom: '5px', fontSize: 'medium' }}>{comment.userName}</div>
                        <div>{comment.comment}</div>
                    </div>
                )
            }
        </div>
    );
};

export default ShowComments;