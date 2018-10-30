import React, { Component } from "react";
import Comment from "./comments";
import CommentEditor from "./commentEditor";

class CommentDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }
  addComment = newCommentBody => {
    const newState = Object.assign({}, this.state);
    newState.comments.push(newCommentBody);
    this.setState(newState);
  };

  render() {
    return (
      <div className="commentEditor">
        {this.state.comments.map((commentBody, idx) => {
          return <Comment key={idx} commentBody={commentBody} />;
        })}
        <CommentEditor addComment={this.addComment} />
      </div>
    );
  }
}

export default CommentDisplay;
