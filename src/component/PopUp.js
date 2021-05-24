import React from 'react';
import Modal from '@material-ui/core/Modal';
import CreatePost from "./CreatePost.js";
import "../index.css";



export default function PopUp() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div className="post-upload-container">
      <button type="button" onClick={handleOpen} className="post-upload-button">
        Create Post
      </button>

      <Modal open={open} onClose={handleClose}>
        <CreatePost />
      </Modal>
    </div>
  );
}