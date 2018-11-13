import React, { Component } from "react";
import "../styles/comment.css";

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

  createComment = () => {
    if (this.state.newCommentBody !== "") {
      this.props.addComment(this.state.newCommentBody);
      this.setState({
        newCommentBody: ""
      });
    }
  };

  render() {
    return (
      <div className="commentcontainer">
        <form class="commentfield" onChange={this.handleCommentChange}>
          <input
            className="commentinput"
            value={this.state.newCommentBody}
            placeholder="Comment something here.."
          />
          <button
            className="commbtn"
            onClick={() => this.createComment()}
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
