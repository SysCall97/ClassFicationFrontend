import React, { useEffect, useState } from 'react';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Button } from '@mui/material';
import { createPost, getPost } from '../../services/class';
import InfiniteScroll from 'react-infinite-scroll-component';
import ShowPost from '../showPost/ShowPost';

const Posts = ({classCode}) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [uid, setUid] = useState(null);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUid(user.uid);
        getPosts();
    }, []);
    const getPosts = () => {
        getPost({classCode, page}).then(res => {
            setPosts(prev => [...prev, ...res.data.data._posts]);
            setPage(prev => prev+1);
            setHasMore(res.data.data.hasMore);
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
                    minRows={8}
                    placeholder="Update about this class"
                    style={{ width: '95%', marginTop: '10px', marginBottom: '10px' }}
                />
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button variant="contained" onClick={handleCreatePost} disabled={isDisabled}>Post</Button>
                </div>
            </div>
            <div style={{gridColumn:"4/12", fontWeight: "600", fontSize: "20px"}}>Posts</div>
            {
                !!posts.length && 
                <InfiniteScroll
                    dataLength={posts.length}
                    next={getPosts}
                    hasMore={hasMore}
                    loader={<div style={{
                        gridColumn:"4/12",
                        textAlign: 'center',
                        marginTop: '15px',
                        color: '#555'
                    }}>Loading...</div>}
                    style={{overflow: "none"}}
                >
                    {posts.map(post => 
                        <ShowPost key={post._id} post={post} classCode={classCode} uid={uid} posts={posts} setPosts={setPosts} />
                    )}
                </InfiniteScroll>
        }
        </>
    );
};

export default Posts;