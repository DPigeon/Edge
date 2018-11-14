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

  /*componentDidMount() {
    fetch("http://localhost:8000/test/comments")
      .then(res => res.json())
      .then(json => {
        this.setState({
          items: json.commentList
        });
      });
  }*/

  addComment = newCommentBody => {
    const newState = Object.assign({}, this.state);
    newState.comments.unshift(newCommentBody);
    this.setState(newState);
  };

  render() {
    return (
      <React.Fragment>
        <div className="comment-body">
          <CommentEditor
            addComment={this.addComment}
            email={this.props.email}
            postId={this.props.postId}
          />
          {this.state.comments.map((commentBody, idx) => {
            return <Comment key={idx} commentBody={commentBody} />;
          })}
        </div>
        <div className="postEditor" />
      </React.Fragment>
    );
  }
}

export default CommentDisplay;
