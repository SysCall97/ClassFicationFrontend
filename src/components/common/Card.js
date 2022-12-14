import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const _Card = (props) => {
    const { className, classCode, numOfStudents, numOfTeachers, numOfPosts } = props._class;
    return (
        <Card sx={{ minWidth: 275, boxShadow: 3 }} style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 4px", borderRadius: "10px"}}>
            <CardContent>
                <Typography variant="h5" component="div">
                  {className}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  Class code: {classCode}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  Number of students: {numOfStudents}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  Number of teachers: {numOfTeachers}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  Unread messages: 0
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  New posts: 0
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={`../class/${classCode}`}><Button size="small">View Posts</Button></Link>
                <Button size="small">View Messages</Button>
            </CardActions>
        </Card>
    );
};

export default _Card;