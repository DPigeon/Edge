import React from "react";
import CommentDisplay from "./commentDisplay";
import LikeDislike from "./likeDislike";
import "./css/post.css";

const Post = props => (
  <div className="aPost">
    <div className="card">
      <h5>Post by {props.from}</h5>
      {props.postBody}
      <br />
      <br />
      <CommentDisplay />
      <LikeDislike postId={props.postId} />
    </div>
  </div>
);

export default Post;
