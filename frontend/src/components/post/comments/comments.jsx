import React from "react";
import "./style/comment.css";

const Comments = props => (
  <div className="commentcard">
    <h8 className="commentname">
      Comment by <a href={"/user/" + this.props.by}>{this.props.by}</a>
    </h8>
    <br />

    {props.commentBody}
  </div>
);

export default Comments;
