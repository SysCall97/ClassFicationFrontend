import React, { useState } from 'react';
import './ClassTimeline.css'
import { useParams } from 'react-router-dom';
import Posts from '../posts/Posts';

const _option = {
    post: 1,
    teacher: 2,
    student: 3
};

const ClassTimeline = () => {
    const { classCode } = useParams();
    const [option, setOption] = useState(_option.post);
    
    return (
        <div className='wrapper'>
            <div className='optionWrapper'>
                <div onClick={() => setOption(_option.post)}>Posts</div>
                <div onClick={() => setOption(_option.teacher)}>Teachers</div>
                <div onClick={() => setOption(_option.student)}>Students</div>
            </div>
            {
                option === _option.post && <Posts classCode={classCode} />
            }
            {
                option === _option.teacher && <div className='childWrapper'>teachers</div>
            }
            {
                option === _option.student && <div className='childWrapper'>students</div>
            }
        </div>
    );
};

export default ClassTimeline;