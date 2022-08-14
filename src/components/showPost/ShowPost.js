import React, { useState } from 'react';
import { createComment, getComments } from '../../services/class';
import PostAction from '../postAction/PostAction';
import { Button, Divider } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import ShowComments from '../showComments/ShowComments';

const ShowPost = ({ post, classCode, uid, posts, setPosts }) => {
    const [comments, setComments] = useState([]);
    const [isCommentLoaded, setIsCommentLoaded] = useState(false);

    const handleCreateComment = (postId, e) => {
        if(e.key === "Enter" && !e.shiftKey) {
            const payload = { comment: e.target.value };
            e.target.value = null;
            createComment({ classCode, postId, payload }).then(res => {
                setComments(prev => [...prev, res.data.data]);
            })
        }
    }

    const getPostComment = () => {
        getComments({ classCode, postId: post._id }).then((res) => {
            setIsCommentLoaded(true);
            setComments(res.data.data._comments);
        })
    }
    return (
        <div className='childPostWrapper' style={{boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 4px"}} key={post._id}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div className='cardName'>{post.userName}</div>
                {
                    post.uid === uid && <PostAction postId={post._id} content={post.post} classCode={classCode} posts={posts} setPosts={setPosts} />
                }
            </div>
            <div className='date'>{post.date}</div>
            <div className='post'>{post.post}</div>
            <Divider style={{marginBottom: '10px', marginTop: '20px'}} />
            <TextareaAutosize
                minRows={1}
                placeholder="Write a comment..."
                onKeyUp={(e) => handleCreateComment(post._id, e)}
                style={{ width: '95%', marginTop: '10px', marginBottom: '10px', borderRadius: '100px' }}
            />
            <Divider style={{marginBottom: '10px', marginTop: '10px'}} />
            {!isCommentLoaded && <Button color="inherit" onClick={getPostComment}> Load Comments </Button>}
            {isCommentLoaded && !comments.length && <div style={{textAlign: 'center'}}>No comments yet</div>}
            {isCommentLoaded && comments.length > 0 && <ShowComments comments={comments} setComments={setComments} postId={post._id} classCode={classCode} /> }
        </div>
    );
};

export default ShowPost;