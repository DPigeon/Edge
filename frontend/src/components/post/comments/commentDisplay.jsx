import React, { Component } from "react";
import Comment from "./comments";
import CommentEditor from "./commentEditor";

class CommentDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayOfComments: [],
      comments: [],
      items: []
    };
  }

  addComment = newCommentBody => {
    window.location.reload();
    /*const newState = Object.assign({}, this.state);
    newState.comments.unshift(newCommentBody);
    this.setState(newState);*/ //not needed anymore
  };

  setCommentsById(comments, postId) {
    var commentsById = [];
    for (var i = 0; i < comments.length; i++) {
      if (postId === comments[i].post_id) commentsById[i] = comments[i];
    }
    //this.setState({ arrayOfComments: commentsById });
  }

  showComments(postId) {
    this.setCommentsById(this.props.comments, postId);
    console.log(this.state.arrayOfComments);
    return (
      <div>
        {this.state.arrayOfComments.map((item, idx) => {
          return (
            <Comment
              key={item.post_id}
              commentBody={item.data}
              by={item.author_email}
            />
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="comments">
          <CommentEditor
            addComment={this.addComment}
            email={this.props.email}
            postId={this.props.postId}
          />
          {this.showComments(this.props.postId)}
        </div>
      </React.Fragment>
    );
  }
}

export default CommentDisplay;
