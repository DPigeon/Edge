import React from "react";
//import "./css/post.css";

const Post = props => (
  <div className="card post-editor post-body">
    <div className="card-title">{props.postBody}</div>
  </div>
);

export default Post;
