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
  };

  render() {
    return (
      <React.Fragment>
        <div className="comments">
          <CommentEditor
            addComment={this.addComment}
            email={this.props.email}
            postId={this.props.postId}
          />
          <div className="">
            {this.props.posts[this.props.id].commentList.map((item, id) => (
              <Comment
                key={id}
                commentBody={item.data}
                by={item.author_email}
              />
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CommentDisplay;
