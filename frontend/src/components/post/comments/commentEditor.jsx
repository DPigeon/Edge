import React, { Component } from "react";
import "../styles/post.css";

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
          "Content-Type": "application/json"
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
      <div className="commentEditor">
        <form id="ex" class="exaple" onChange={this.handleCommentChange}>
          <input
            id="ppp"
            class="commenttt"
            value={this.state.newCommentBody}
            placeholder="Comment something here.."
          />
          <button
            class="commbtn"
            onClick={() =>
              this.createComment(this.props.email, this.props.postId)
            }
            type="button"
          >
            Comment
          </button>
        </form>
      </div>
    );
  }
}

export default CommentEditor;
