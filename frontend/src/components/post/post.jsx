import React from "react";
import CommentDisplay from "./comments/commentDisplay";
import LikeDislike from "./likesDislikes/likeDislike";
import "./styles/post.css";

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
