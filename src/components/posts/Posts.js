import React, { useEffect, useState } from 'react';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Button } from '@mui/material';
import { createPost, getPost } from '../../services/class';

const Posts = ({classCode}) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        getPosts();
    }, []);
    const getPosts = () => {
        getPost(classCode).then(res => {
            setPosts(res.data.data);
        })
    }
    const handleCreatePost = () => {
        setIsDisabled(true);
        const payload = {
            post: document.getElementById('postContent').value
        }
        createPost({classCode, payload}).then(res => {
            setPosts(prev => [res.data.data, ...prev]);
            document.getElementById('postContent').value = '';
        }).finally(() => setIsDisabled(false));
    }
    return (
        <>
            <div className='childWrapper'>
                <div className='cardName'>Create Post</div>
                <TextareaAutosize
                    id='postContent'
                    minRows={5}
                    placeholder="Update about this class"
                    style={{ width: '95%', marginTop: '10px', marginBottom: '10px' }}
                />
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button variant="contained" onClick={handleCreatePost} disabled={isDisabled}>Post</Button>
                </div>
            </div>
            <div style={{gridColumn:"4/10", fontWeight: "600", fontSize: "20px"}}>Posts</div>
            {
                !!posts.length && posts.map(post => 
                <div className='childWrapper' key={post._id}>
                    <div className='cardName'>{post.userName}</div>
                    <div className='date'>{post.date}</div>
                    <div className='post'>{post.post}</div>
                </div>)
        }
        </>
    );
};

export default Posts;