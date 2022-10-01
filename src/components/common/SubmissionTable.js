import React from 'react';
import { getDateString } from '../../helpers/getDateString';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { getSubmissionLink, saveMark } from '../../services/class';


const SubmissionTable = ({ submissions, lastDate, classCode, assignmentId }) => {
    const columns = [
        { field: 'name', headerName: 'Name', width: 220 },
        { field: 'submissionStatus', headerName: 'Submission Status', width: 180 },
        { field: 'submittedAt', headerName: 'Submission Date', width: 250 },
        { field: 'mark', headerName: 'Mark', width: 130, type: 'number', editable: true },
        {
            headerName: "Actions",
            renderCell: (param) => {
                const { row } = param;
                return (<><Button onClick={() => handleSave(row)}>Save</Button> <Button onClick={() => handleOpenSubmission(row)}>See Submission</Button></>)
            },
            editable: 0,
            width: 280
        },
    ];
    const rows = submissions.map(submission => {
        return {
            id: submission._id,
            name: submission.student.name,
            submissionStatus: lastDate >= submission.createdAt ? "On time Submmission" : "Late Submission",
            submittedAt: getDateString(submission.createdAt),
            mark: submission.mark == -1 ? "" : submission.mark,
        }
    });

    const handleSave = (row) => {
        const {mark, id} = row
        const payload = { mark };
        saveMark({submissionId: id, payload, classCode, assignmentId});
    }
    const handleOpenSubmission = async ({id}) => {
        const data = await getSubmissionLink({classCode, assignmentId, submissionId: id});
        window.open(data.data.link);
    }
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
            />
        </div>
    );
};

export default SubmissionTable;