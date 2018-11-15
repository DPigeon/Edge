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

  /*componentDidMount() {
    fetch("http://localhost:8000/posts")
      .then(res => res.json())
      .then(json => {
        this.setState({
          items: json.postList //posts get into a stack/array
        });
        //console.log(this.state.items[0]);
      });
  }*/

  addComment = newCommentBody => {
    window.location.reload();
    /*const newState = Object.assign({}, this.state);
    newState.comments.unshift(newCommentBody);
    this.setState(newState);*/ //not needed anymore
  };

  showComments() {
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
        <div className="comment-body">
          <CommentEditor
            addComment={this.addComment}
            email={this.props.email}
            postId={this.props.postId}
          />
          {this.showComments()}
        </div>
        <div className="postEditor" />
      </React.Fragment>
    );
  }
}

export default CommentDisplay;
