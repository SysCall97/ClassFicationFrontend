import React, { useEffect, useState } from 'react';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Button, Divider } from '@mui/material';
import { createComment, createPost, getPost } from '../../services/class';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostAction from '../postAction/PostAction';

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

    const handleCreateComment = (postId, e) => {
        if(e.key === "Enter" && !e.shiftKey) {
            const payload = { comment: e.target.value };
            e.target.value = null;
            createComment({ classCode, postId, payload }).then(res => {
                // res.data = {
                //     "postId": "62f3c0f54eb1f84c30f180ce",
                //     "uid": "62f163b23afa5e6728641c5a",
                //     "active": true,
                //     "comment": "Hi, Mashry. Welcome onboard.",
                //     "_id": "62f663be23e7aac87b8e8100",
                //     "createdAt": "2022-08-12T14:29:19.336Z",
                //     "updatedAt": "2022-08-12T14:29:19.336Z",
                //     "__v": 0
                // }
            })
        }
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
                !!posts.length && 
                <InfiniteScroll
                    dataLength={posts.length}
                    next={getPosts}
                    hasMore={hasMore}
                    loader={<div style={{
                        gridColumn:"4/10",
                        textAlign: 'center',
                        marginTop: '15px',
                        color: '#555'
                    }}>Loading...</div>}
                    style={{overflow: "none"}}
                >
                    {posts.map(post => 
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
                    </div>)}
                </InfiniteScroll>
        }
        </>
    );
};

export default Posts;