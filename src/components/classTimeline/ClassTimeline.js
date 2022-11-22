import React, { useContext, useState } from 'react';
import './ClassTimeline.css'
import { useParams } from 'react-router-dom';
import Posts from '../posts/Posts';
import MemberList from '../memberList/MemberList';
import { getStudents, getTeachers } from '../../services/class';
import { context } from '../../App';
import Assignment from '../assignment/Assignment';
import Session from '../session/Session';

const _option = {
    post: 1,
    teacher: 2,
    student: 3,
    assignments: 4,
    session: 5,
};

const ClassTimeline = () => {
    const { user } = useContext(context);
    const [loggedinUser, setLoggedinUser] = user;
    const { classCode } = useParams();
    const [option, setOption] = useState(_option.post);
    
    return (
        <div className='wrapper'>
            <div className='optionWrapper'>
                <div className='_option' style={option === _option.post ? {backgroundColor: '#eee'} : {}} onClick={() => setOption(_option.post)}>Posts</div>
                <div className='_option' style={option === _option.teacher ? {backgroundColor: '#eee'} : {}} onClick={() => setOption(_option.teacher)}>Teachers</div>
                <div className='_option' style={option === _option.student ? {backgroundColor: '#eee'} : {}} onClick={() => setOption(_option.student)}>Students</div>
                <div className='_option' style={option === _option.assignments ? {backgroundColor: '#eee'} : {}} onClick={() => setOption(_option.assignments)}>Assignments</div>
                <div className='_option' style={option === _option.session ? {backgroundColor: '#eee'} : {}} onClick={() => setOption(_option.session)}>Session</div>
            </div>
            {
                option === _option.post && <Posts classCode={classCode} />
            }
            {
                option === _option.teacher && <MemberList classCode={classCode} type="teachers" getMember={getTeachers} />
            }
            {
                option === _option.student && <MemberList classCode={classCode} type="students" getMember={getStudents} />
            }
            {
                option === _option.assignments && <Assignment classCode={classCode} type={loggedinUser.role == 1? "teachers" : "students"} />
            }
            {
                option === _option.session && <Session classCode={classCode} type={loggedinUser.role == 1? "teachers" : "students"} />
            }
            
        </div>
    );
};

export default ClassTimeline;