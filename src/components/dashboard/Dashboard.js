import React, { useEffect, useState, useContext } from 'react';
import { context } from "../../App";
import { deleteAuthTokenFromStorage } from '../../helpers/storages';
import { getClassList } from '../../services/user';
import Card from '../common/Card';
import Dialog from '../common/Dialog';

const Dashboard = () => {
    const [classList, setClassList] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(context);
    const [loggedinUser, setLoggedinUser] = user;

    useEffect(() => {
        setLoading(true);
        getClassList().then(res => setClassList(res.data)).catch(async err=> {
            setClassList([]);
            const {response} = err;
            if(response.status === 500) {
                setTitle(response.title)
                setContent(response.message);
                setOpen(true);
            } else if(response.status === 401) {
                await deleteAuthTokenFromStorage();
                await setLoggedinUser({isLoggedIn: false});
            }
        }).finally(() => setLoading(false));
    }, []);
    const handleClose = () => {
        setOpen(false);
        setContent("");
        setTitle("");
    };
    return (
        <div className='classListWrapper'>
            <Dialog open={open} handleClose={handleClose} content={content} title={title} />
            {classList.length === 0 && !loading && 
                <div style={{
                    width: '100%', 
                    textAlign: 'center', 
                    color: '#777', 
                    fontWeight: '500', 
                    fontSize: '30px'}}
                >You haven't joined any class yet</div>}
            {classList.map(_class => <Card _class = {_class} key={_class.classCode} />)}
        </div>
    );
};

export default Dashboard;