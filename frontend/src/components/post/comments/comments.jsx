import React from "react";
import "../styles/post.css";

const Comments = props => (
  <div className="aComment">
    <div className="card">
      <h5>Comment by {localStorage.getItem("email")}</h5>
      {props.commentBody}
      <br />
      <br />
    </div>
  </div>
);

export default Comments;
