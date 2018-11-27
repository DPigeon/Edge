import React, { Component } from "react";
import "./style/comment.css";

class CommentEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCommentBody: ""
    };
  }

  handleCommentChange = event => {
    this.setState({
      newCommentBody: event.target.value
    });
  };

  createComment = (email, postId) => {
    if (this.state.newCommentBody !== "") {
      this.props.addComment(this.state.newCommentBody);
      this.setState({
        newCommentBody: ""
      });
      fetch("http://localhost:8000/comments", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          jwt: localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          author_email: email,
          data: this.state.newCommentBody,
          post_id: postId
        })
      });
    }
  };

  render() {
    return (
      <div className="commentcontainer">
        <form className="commentfield">
          <input
            className="commentinput"
            value={this.state.newCommentBody}
            placeholder="Comment something here.."
            onChange={this.handleCommentChange}
          />
          <button
            className="commentbtn"
            onClick={() =>
              this.createComment(this.props.email, this.props.postId)
            }
          >
            Comment
          </button>
        </form>
      </div>
    );
  }
}

export default CommentEditor;
