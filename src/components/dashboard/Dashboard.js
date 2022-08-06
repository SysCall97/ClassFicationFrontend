import React, { useEffect, useState } from 'react';
import { getClassList } from '../../services/user';
import Card from '../common/Card';

const Dashboard = () => {
    const [classList, setClassList] = useState([]);

    useEffect(() => {
        getClassList().then(res => setClassList(res.data)).catch(err=> setClassList([]));
    }, []);
    return (
        <div className='classListWrapper'>
            {classList.map(_class => <Card _class = {_class} key={_class.classCode} />)}
        </div>
    );
};

export default Dashboard;