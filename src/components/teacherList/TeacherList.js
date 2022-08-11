import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSigninNavigate } from '../../helpers/useNavigateSignin';
import { getTeachers } from '../../services/class';

const TeacherList = ({ classCode }) => {
    const [teachers, setTeachers] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const handleSigninNavigate = useSigninNavigate();
    useEffect(() => {
        _getTeachers();
    }, []);
    const _getTeachers = () => {
        getTeachers({classCode, page}).then(res => {
            setTeachers(prev => [...prev, ...res.data.data.teachers]);
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
                !!teachers.length && 
                <InfiniteScroll
                    dataLength={teachers.length}
                    next={_getTeachers}
                    hasMore={hasMore}
                    loader={<div style={{
                        gridColumn:"4/10",
                        textAlign: 'center',
                        marginTop: '15px',
                        color: '#555'
                    }}>Loading...</div>}
                    style={{overflow: "none"}}
                >
                    {teachers.map(teacher => 
                    <div className='childPostWrapper' style={{boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 4px"}} key={teacher._id}>
                        <div>{teacher.name}</div>
                    </div>)}
                </InfiniteScroll>
            }
            {
                !teachers.length && 
                <div style={{gridColumn:"6/10", fontWeight: "600", fontSize: "20px", color: "#777"}}>No teacher joined in this class yet.</div>
            }
        </>
    );
};

export default TeacherList;