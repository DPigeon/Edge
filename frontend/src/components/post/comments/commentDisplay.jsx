import React, { Component } from "react";
import Comment from "./comments";
import CommentEditor from "./commentEditor";

class CommentDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  showComments(postId) {
    for (var i = 0; i < this.props.posts.length; i++) {
      for (var j = 0; j < this.props.comments.length; j++) {
        return (
          <div>
            {this.props.posts[i].commentList.map((item, idx) => {
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
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="">
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
