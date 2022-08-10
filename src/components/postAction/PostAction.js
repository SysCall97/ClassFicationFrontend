import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteDialogue from '../common/DeleteDialogue';
import EditDialogue from '../common/EditDialogue';

const PostAction = ({postId, classCode, setPosts, posts, content}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDeleteDialogue, setOpenDeleteDialogue] = useState(false);
    const [openEditDialogue, setOpenEditDialogue] = useState(false);

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
    const handleCloseEditDialogue = () => {
        setOpenEditDialogue(false);
    };
    const handleEdit = () => {
        handleClose();
        setOpenEditDialogue(true);
    };
    const handleDelete = () => {
        handleClose();
        setOpenDeleteDialogue(true);
    };
    return (
        <div>
            <DeleteDialogue open={openDeleteDialogue} handleClose={handleCloseDeleteDialogue} type="post" postId={postId} classCode={classCode} posts={posts} setPosts={setPosts} />
            <EditDialogue open={openEditDialogue} content={content} handleClose={handleCloseEditDialogue} type="post" postId={postId} classCode={classCode} posts={posts} setPosts={setPosts} />
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
                <MenuItem onClick={handleDelete} style={{color:'red'}}>Delete Post</MenuItem>
            </Menu>
    </div>
    );
};

export default PostAction;