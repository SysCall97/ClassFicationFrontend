import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const _Card = (props) => {
    console.log(props)
    const { className, classCode, numOfStudents } = props._class;
    return (
        <Card sx={{ minWidth: 275, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                  {className}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  Class code: {classCode}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  Number of members: {numOfStudents}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  Unread messages: 0
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  New posts: 0
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">View Posts</Button>
                <Button size="small">View Messages</Button>
            </CardActions>
        </Card>
    );
};

export default _Card;