import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteDialogue from '../common/DeleteDialogue';

const PostAction = ({postId, classCode, setPosts}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDeleteDialogue, setOpenDeleteDialogue] = useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseDeleteDialogue = () => {
        setOpenDeleteDialogue(false);
    };
    const handleEdit = () => {};
    const handleDelete = () => {
        handleClose();
        setOpenDeleteDialogue(true);
    };
    return (
        <div>
            <DeleteDialogue open={openDeleteDialogue} handleClose={handleCloseDeleteDialogue} type="post" postId={postId} classCode={classCode} setPosts={setPosts} />
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MoreVertIcon color="action" fontSize="small" />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleEdit}>Edit Post</MenuItem>
                <MenuItem onClick={handleDelete}>Delete Post</MenuItem>
            </Menu>
    </div>
    );
};

export default PostAction;