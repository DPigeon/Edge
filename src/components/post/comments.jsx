import React from "react";
import "./css/post.css";

const Comments = props => (
  <div className="aComment">
    <div className="card">
      <h5>Comment by {localStorage.getItem("email")}</h5>
      {props.commentBody}
      <br />
      <br />
      <a href="/">Like Dislike</a>
    </div>
  </div>
);

export default Comments;
