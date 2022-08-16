import { Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSigninNavigate } from '../../helpers/useNavigateSignin';

const MemberList = ({ classCode, getMember, type }) => {
    const [members, setMembers] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const handleSigninNavigate = useSigninNavigate();
    useEffect(() => {
        _getMembers();
    }, []);
    const _getMembers = () => {
        getMember({classCode, page}).then(res => {
            setMembers(prev => [...prev, ...res.data.data[type]]);
            setPage(prev => prev+1);
            setHasMore(res.data.data.hasMore);
        }).catch(err => {
            if(err.response.status === 401) {
                handleSigninNavigate('../../signin');
            }
        })
    }
    return (
        <>
            {
                !!members.length && 
                <InfiniteScroll
                    dataLength={members.length}
                    next={_getMembers}
                    hasMore={hasMore}
                    loader={<div style={{
                        gridColumn:"4/10",
                        textAlign: 'center',
                        marginTop: '15px',
                        color: '#555'
                    }}>Loading...</div>}
                    style={{overflow: "none"}}
                >
                    <div className='childMemberWrapper'>
                    {members.map(member => 
                        <div className='memberDiv' key={member._id}>
                            <div style={{marginBottom: '2%'}}> {member.name} </div>
                            <Divider />
                        </div>
                    )}
                    </div>
                </InfiniteScroll>
            }
            {
                type==="teachers" && !members.length && 
                <div style={{gridColumn:"6/10", fontWeight: "600", fontSize: "20px", color: "#777"}}>No teacher joined in this class yet.</div>
            }
        </>
    );
};

export default MemberList;