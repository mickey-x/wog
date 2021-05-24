import React, { useEffect, useState } from 'react'
import "../index.css";
import { database, auth } from '../firebase/firebase';
import firebase from 'firebase'
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { Link, useParams } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import Comment from './Comment';
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import PopUpFollowing from "./PopUpFollowing";
import PopUpFollower from "./PopUpFollower";

const Profile = () => {
  const { username } = useParams();
  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const [postCount, setPostCount] = useState();
  const [userPosts, setUserPosts] = useState([]);
  const [currentUser , setCurrentUser] = useState("");
  const [followingList, setFollowingList] = useState([]);

  auth.onAuthStateChanged( (user) => {
    if(user) {
      setCurrentUser(user.displayName);
    }
  }) 

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            database
                .collection('users')
                .doc(firebase.auth().currentUser.displayName)
                .collection('following')
                .onSnapshot(snapshot => {
                    setFollowingList(
                        snapshot.docs.map(doc => ({
                            username: doc.data().username
                        })));
                })

        } else {
            // No user is signed in.
        }
    });
    // eslint-disable-next-line
}, [])


  // Dummy Post data to prevent 'undefined' error
  const dummyPostObj = {
    id: "123412427490",
    post: {
      comments: [],
      description: "",
      image: "",
      likes: "",
      location: "",
      timestamp: "",
      username: "",
    }
  };


  // For the <Modal />
  const [postObj, setPostObj] = useState(dummyPostObj);
  const [open, setOpen] = useState(false);
  const increment = firebase.firestore.FieldValue.increment(1);


  const handleOpen = (clicked) => {
    setOpen(clicked);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLikeClick = ( id ) => {
    const post = database.collection("posts").doc(id);
    post.update({ likes: increment });
  };

  const handleImageClick = () => {
    handleOpen(true);
    setPostObj(postObj);
  }

  const isFollowed = (user) => {
    let follow = false;

    // eslint-disable-next-line
    followingList.map(() => {
        if (user === username) {
            follow = true;
        }
    })

    if (follow) {
        return true;
    }
    return false;
  }

  const followUser = (user) => {
    database.collection('users').doc(user).collection('follower').doc(firebase.auth().currentUser.displayName).set({
        username: firebase.auth().currentUser.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    database.collection('users').doc(firebase.auth().currentUser.displayName).collection('following').doc(user).set({
        username: user,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
  }

  const unFollowUser = () => {
      database.collection('users').doc(firebase.auth().currentUser.displayName).collection('following').doc(username).delete().then(() => {
        // intentionally-blank override ?
      }).catch((error) => {
          console.error("Error removing user: ", error);
      });

      database.collection('users').doc(username).collection('follower').doc(firebase.auth().currentUser.displayName).delete().then(() => {
        // intentionally-blank override ?
      }).catch((error) => {
          console.error("Error removing user: ", error);
      });
  }


  // Get user posts & id on page load
  useEffect(() => {
    auth.onAuthStateChanged( (user) => {
      if (user) {
        database
          .collection("posts")
          .where("username", "==", username)
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) => {
            setPostCount(
              snapshot.docs.length
            );
            setUserPosts(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                post: doc.data(),
              }))
            );
          });
      } 
    })
  }, [username]); 

  // Get # of follower on page load
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        database
          .collection("users")
          .doc(username)
          .collection("follower")
          .onSnapshot((snapshot) => {
            setFollower(
              snapshot.docs.map(doc => ({
                username: doc.data().username
            })));
          });
      }
    });
    // eslint-disable-next-line
  }, []); 

  // Get # of following on page load
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        database
          .collection("users")
          .doc(username)
          .collection("following")
          .onSnapshot((snapshot) => {
            setFollowing(
              snapshot.docs.map(doc => ({
                username: doc.data().username
            })));
          });
      }
    });
    // eslint-disable-next-line
  }, []); 



  return (
  <>
    <div className="profile-userInfo">
      <div className="profile-avatar">
          <img src="https://source.unsplash.com/random/250x250/?nature" alt="Profile Avatar"/>
      </div>

      <div className="profile-userMeta">
        <div className="profile-userName">
          <h2>{username}'s Profile</h2>
          {username !== currentUser  &&  
           (isFollowed(username) ?
            <Button variant="contained" color="secondary" style={{marginLeft: '20px'}} onClick={() => unFollowUser()}>Unfollow</Button>
            :
            <Button variant="contained" color="secondary" style={{marginLeft: '20px'}} onClick={() => followUser(username)}> Follow </Button>
           )
        }
        </div>
      
        <div className="profile-stats-box">
          <div className="profile-stats">
            <h4>{postCount} <br /> Posts</h4>
          </div>
          <div className="profile-stats">
            <h4>{follower.length} <br /> <PopUpFollower follower={follower}/></h4>
          </div>
          <div className="profile-stats">
            <h4>{following.length} <br /> <PopUpFollowing following={following}/></h4>
          </div>
        </div>
      </div>
    </div>



    <div className="profile-userPosts">
    { // Loop through each image user have posted, onClick == show that post
      userPosts.map( ({id, post}) => (
        <img src={post.image} alt="" onClick={() => handleImageClick()}/>
      ))
    }
    </div>



    <Modal open={open} onClose={handleClose}>
      <div className="profile-postModal">
        <div className="profile-post" key={ postObj.id }>
          <div className="post-header">
            <Link to={{ pathname: '/profile' }} style={{ textDecoration: 'none' }}>
            <Avatar
              className="post-avatar"
              alt={postObj.post.username}
              src="/static/images/avatar/1.jpg"
              style={{ width: 35, height: 35 }}
            ></Avatar>
            </Link>
            <div className="post-meta">
              <h3 className="post-username">{postObj.post.username}</h3>
              <p className="post-location">{postObj.post.location}</p>
            </div>
          </div>
          <img className="post-image" src={postObj.post.image} alt="" />

          <div className="post-body">
            <div className="post-icons">
              <FavoriteBorder
                onClick={() => handleLikeClick(postObj.id)}
                style={{ marginRight: 8, width: 20 }}
              />
              <ChatBubbleOutlineOutlinedIcon
                style={{ marginRight: 8, width: 20 }}
              />
            </div>

            <p className="post-like-number"> Liked by { postObj.post.likes } people</p>
            <h4 className="post-description">
              <strong>{ postObj.post.username }</strong> { postObj.post.description }
            </h4>
            <h3 className="post-comment">Comments</h3>

            <Comment postId={ postObj.id } />
          </div>
        </div>

      </div>
    </Modal>
  </>
  );
};

export default Profile;