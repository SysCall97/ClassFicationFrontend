import React, { useEffect, useState } from 'react';
import { getClassList } from '../../services/user';

const Dashboard = () => {
    const [classList, setClassList] = useState([]);

    useEffect(() => {
        getClassList().then(res => setClassList(res.data)).catch(err=> setClassList([]));
    }, []);
    return (
        <div>
            
        </div>
    );
};

export default Dashboard;