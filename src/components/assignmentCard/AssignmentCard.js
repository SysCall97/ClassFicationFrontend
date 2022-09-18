import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {getDateString} from '../../helpers/getDateString';
import { getTimeString } from '../../helpers/getTimeString';

const AssignmentCard = ({ assignment, type, status }) => {
    const { _id, title, classCode, startDate, lastDate, teacher } = assignment;
    const { name } = teacher;
    const [startDateTime, setStartDateTime] = useState({date: null, time: null});
    const [endDateTime, setEndDateTime] = useState({date: null, time: null});

    useEffect(() => {
        console.log(type)
        setStartDateTime({
            date: getDateString(startDate),
            time: getTimeString(startDate)
        });
        setEndDateTime({
            date: getDateString(lastDate),
            time: getTimeString(lastDate)
        });
    }, []);
    return (
        <Card sx={{ minWidth: 295, margin: 1 }} style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 4px", borderRadius: "10px"}}>
            <CardContent>
                <Typography variant="h6" component="div">
                    {title}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    {name}
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
                <Typography sx={{ fontSize: 13 }} color="text.secondary">
                  Last Date: {endDateTime.date}
                </Typography>
                <Typography sx={{ fontSize: 13 }} color="text.secondary">
                  Last Time: {endDateTime.time}
                </Typography>
                {
                type === "students" && status !== "future" && 
                <Typography sx={{ fontSize: 13 }} color="text.secondary">
                  Submission status: Submitted
                </Typography>
            }
            </CardContent>
            {
                !(type === "students" && status === "future") &&
                <CardActions>
                    <Button variant="contained" color="inherit" fullWidth>
                        View Assignment
                    </Button>
                </CardActions>
            }
            {
                type === "students" && status !== "future" && 
                <CardActions>
                    <Button variant="contained" color="primary" fullWidth>
                        Submit
                    </Button>
                </CardActions>
            }
        </Card>
    );
};

export default AssignmentCard;