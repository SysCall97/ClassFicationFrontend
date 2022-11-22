import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {getDateString} from '../../helpers/getDateString';
import { getTimeString } from '../../helpers/getTimeString';
import { getSessionCode } from '../../services/session';

const SessionCard = ({ session, type, classCode }) => {
    const [startDateTime, setStartDateTime] = useState({date: null, time: null});
    const { _id, teacher, startDate } = session;
    const { name } = teacher;
    const [isMeetingAvailable, setIsMeetingAvailable] = useState(false);
    const {uid} = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        setStartDateTime({
            date: getDateString(startDate),
            time: getTimeString(startDate)
        });
        const startingTime = new Date(startDate).getTime();
        const currentTime = Date.now();
        setIsMeetingAvailable(startingTime <= currentTime);
    }, []);

    const handleJoinSession = () => {
        getSessionCode({classCode, sessionId: session._id }).then(val => {
            const sessionCode = val.data.data.sessionCode;
            window.open(`http://localhost:3000/room/${sessionCode}?id=${uid}`);
        })
    }
    return (
        <div>
            <Card sx={{ maxWidth: 280, margin: 1 }} style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 4px", borderRadius: "10px"}}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        Session creator: {name}
                    </Typography>
                    <Typography sx={{ fontSize: 13 }} color="text.secondary">
                        Class code: {classCode}
                    </Typography>
                    <Typography sx={{ fontSize: 13 }} color="text.secondary">
                        Start Date: {startDateTime.date}
                    </Typography>
                    <Typography sx={{ fontSize: 13 }} color="text.secondary">
                        Start Time: {startDateTime.time}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="inherit" fullWidth onClick={handleJoinSession} disabled={!isMeetingAvailable}>
                        Join session
                    </Button>
                </CardActions>
               
            </Card>
        </div>
    );
};

export default SessionCard;