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
                    {members.map(member => 
                    <div className='childPostWrapper' style={{boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 4px"}} key={member._id}>
                        <div>{member.name}</div>
                    </div>)}
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