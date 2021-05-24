import React, { useState } from "react";
import Modal from '@material-ui/core/Modal';
import Avatar from "@material-ui/core/Avatar";


const PopUpFollower = ({follower}) => {
    const[open, setOpen] = useState(false);
    
    const handleOpen = () => {
        if (follower.length !== 0) {
            setOpen(true);
        }
    }

    const handleClose = () => {
        setOpen(false);
      };
      
    return (
      <>
        <span
          className="like-people"
          onClick={handleOpen}
        >
          {" "}
          Follower {" "}
        </span>

        <Modal open={open} onClose={handleClose}>
          <div className="like-popup">
            {follower.map(({ username }) => (
              <div className="like-popup-userInfo">
                <Avatar
                  className="user-avatar"
                  src="/broken-image.jpg"
                  style={{ width: 35, height: 35 }}
                ></Avatar>
                <h4>{username}</h4>
              </div>
            ))}
          </div>
        </Modal>
      </>
    );
}

export default PopUpFollower;