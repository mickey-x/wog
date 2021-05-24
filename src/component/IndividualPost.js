import "../index.css";
import Avatar from "@material-ui/core/Avatar";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import Comment from "./Comment";
import Like from "./Like";
import PopUpLike from "./PopUpLike";
import Grid from "@material-ui/core/Grid";

const IndividualPost = ({ id, post }) => {
  return (
    <>
      <Grid
        container
        spacing={1}
        justify="center"
        direction="row"
        alignItems="center"
      >
        <Grid item md>
          <img className="post-image" src={post.image} alt="Post" />
        </Grid>

        <Grid item md>
          <div>
            <div className="post-header">
              <Avatar
                className="post-avatar"
                alt={post.username}
                src="/static/images/avatar/1.jpg"
                style={{ width: 35, height: 35 }}
              ></Avatar>
              <div className="post-meta">
                <h3 className="post-username">{post.username}</h3>
                <p className="post-location">{post.location}</p>
              </div>
            </div>
            <div className="post-body">
              <div className="post-icons">
                <Like id={id} />
                <ChatBubbleOutlineOutlinedIcon
                  style={{ marginRight: 8, width: 20, cursor: "pointer" }}
                />
                {post.comments}
              </div>

              <p className="post-like-number">
                {" "}
                Liked by {post.likes}
                <PopUpLike id={id} />
              </p>

              <h4 className="post-description">
                <strong>{post.username}</strong> {post.description}
              </h4>

              <h3 className="post-comment">Comments</h3>

              <Comment postId={id} all={false} />
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default IndividualPost;
