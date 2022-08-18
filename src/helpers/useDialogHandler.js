import { useState } from "react";

export const useDialogHandler = () => {
    const [title, setTitle] = useState("");
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState("");
    const handleDialogClose = () => {
        setOpen(false);
        setContent("");
        setTitle("");
    };

    return [
        open, setOpen,
        title, setTitle,
        content, setContent,
        handleDialogClose
    ];
}