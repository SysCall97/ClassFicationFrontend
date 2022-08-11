import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSigninNavigate } from '../../helpers/useNavigateSignin';
import { getStudents } from '../../services/class';

const StudentList = ({ classCode }) => {
    const [students, setStudents] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const handleSigninNavigate = useSigninNavigate();
    useEffect(() => {
        _getStudents();
    }, []);
    const _getStudents = () => {
        getStudents({classCode, page}).then(res => {
            setStudents(prev => [...prev, ...res.data.data.students]);
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
                !!students.length && 
                <InfiniteScroll
                    dataLength={students.length}
                    next={_getStudents}
                    hasMore={hasMore}
                    loader={<div style={{
                        gridColumn:"4/10",
                        textAlign: 'center',
                        marginTop: '15px',
                        color: '#555'
                    }}>Loading...</div>}
                    style={{overflow: "none"}}
                >
                    {students.map(student => 
                    <div className='childPostWrapper' style={{boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 4px"}} key={student._id}>
                        <div>{student.name}</div>
                    </div>)}
                </InfiniteScroll>
        }
        </>
    );
};

export default StudentList;