import { useState, useEffect, React} from "react";
import { makeStyles } from '@material-ui/core/styles';
import firebase from "firebase";
import { database } from "../firebase/firebase";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "../index.css";

const Comment = ({ postId, all }) => {
  const increment = firebase.firestore.FieldValue.increment(1);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  let length = 0;
  let start = 0;
  
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(2),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));
  const classes = useStyles();

  useEffect(() => {
    if (postId) {
      database
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .orderBy("timestamp", "asc")
        .onSnapshot(snapshot => {
          setComments(snapshot.docs.map(doc => ({
            username: doc.data().username,
            comment: doc.data().comment,
            timestamp: doc.data().timestamp
          })));
        });
    }
    // eslint-disable-next-line
  }, []);

  const postComment = (event) => {
    event.preventDefault();
    database.collection("posts").doc(postId).collection("comments").add({
      comment: comment,
      username: firebase.auth().currentUser.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
    database.collection("posts").doc(postId).update({comments : increment})
  };

  function lengthIs() {
    if (all) {
      length = comments.length
      start = 0
    }
    else {
      length = comments.length
      if(length <= 3) {
        start = 0;
      }
      else {
        start = comments.length - 3
      }
    }
  }


  return (
    <div>
      {comments.slice(start, length).map(({ username}) => (
        <div className="post_comment">
          <p>
            <strong>{username} </strong> {comment}
          </p>
        </div>
      ))}

      <form className="post_commentBox">
        <TextField
          className="post_input"
          data-testid="commentingBox"
          variant="outlined"
          size="small"
          margin="normal"
          label="Comment"
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          disabled={!comment}
          data-testid="addCommentButton"
          type="submit"
          onClick={postComment}
          className={classes.margin}
        >
          Post
        </Button>
      </form>
    </div>
  );
};

export default Comment;