import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {getDateString} from '../../helpers/getDateString';
import { getTimeString } from '../../helpers/getTimeString';
import { getAssignmentLink, getSubmissionLink } from '../../services/class';
import { useDialogHandler } from '../../helpers/useDialogHandler';
import SubmitAssignment from '../submitAssignment/SubmitAssignment';
import Dialog from '../common/Dialog';
import SubmissionTable from '../common/SubmissionTable';

const AssignmentCard = ({ assignment, type, status }) => {
    const { _id, title, classCode, startDate, lastDate, teacher, submissions } = assignment;
    const { name } = teacher;
    const [startDateTime, setStartDateTime] = useState({date: null, time: null});
    const [endDateTime, setEndDateTime] = useState({date: null, time: null});
    const [ open, setOpen, _title, setTitle, content, setContent, handleDialogClose, maxWidth, setMaxWidth ] = useDialogHandler();
    const [submissionStatus, setSubmissionStatus] = useState(null);

    useEffect(() => {
        setSubmissionStatus(()=> {
            if(submissions.length === 0) return "Not submitted";
            if(submissions[0].createdAt < lastDate) return `Submitted`;
            else return `Submitted (late)`;
        });
        setStartDateTime({
            date: getDateString(startDate),
            time: getTimeString(startDate)
        });
        setEndDateTime({
            date: getDateString(lastDate),
            time: getTimeString(lastDate)
        });
    }, []);

    const handleOpenAssignment = async () => {
        const data = await getAssignmentLink({classCode, assignmentId: _id});
        window.open(data.data.link);
    }
    const openDialog = () => {
        setContent(() => <SubmitAssignment classCode={classCode} assignmentId={_id} close={handleDialogClose} />);
        setTitle("Submit Assignment");
        setMaxWidth("sm");
        setOpen(true);
    }
    const openSubmissionListDialog = () => {
        setContent(() => <SubmissionTable classCode={classCode} assignmentId={_id} submissions={submissions} lastDate={lastDate} />);
        setTitle("Submission List");
        setMaxWidth("lg");
        setOpen(true);
    }
    const handleOpenSubmission = async ({id}) => {
        const data = await getSubmissionLink({classCode, assignmentId: _id, submissionId: submissions[0]._id});
        window.open(data.data.link);
    }
    return (
        <>
            <Dialog open={open} handleClose={handleDialogClose} content={content} title={_title} maxWidth={maxWidth} />
            <Card sx={{ maxWidth: 280, margin: 1 }} style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 4px", borderRadius: "10px"}}>
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
                            Submission status: {submissionStatus}
                        </Typography>
                    }
                    {
                        type === "students" && status !== "future" && 
                        <Typography sx={{ fontSize: 13 }} color="text.secondary">
                            Score: {submissions.length > 0 && submissions[0]?.mark === -1 ? "Not evaluated yet" : submissions[0]?.mark}
                        </Typography>
                    }
                </CardContent>
                {
                    !(type === "students" && status === "future") &&
                    <CardActions>
                        <Button variant="contained" color="inherit" fullWidth onClick={handleOpenAssignment}>
                            View Assignment
                        </Button>
                    </CardActions>
                }
                {
                    type === "students" && status !== "future" && submissionStatus === "Not submitted" && 
                    <CardActions>
                        <Button variant="contained" color="primary" fullWidth onClick={openDialog}>
                            Submit
                        </Button>
                    </CardActions>
                }
                {
                    type === "students" && status !== "future" && submissionStatus !== "Not submitted" && 
                    <CardActions>
                        <Button variant="contained" color="primary" fullWidth onClick={handleOpenSubmission}>
                            View Submission
                        </Button>
                    </CardActions>
                }
                {
                    type === "teachers" &&
                    <CardActions>
                        <Button variant="contained" color="primary" fullWidth onClick={openSubmissionListDialog}>
                            Submission list
                        </Button>
                    </CardActions>
                }
            </Card>
        </>
    );
};

export default AssignmentCard;