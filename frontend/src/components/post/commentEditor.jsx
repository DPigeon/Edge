import React, { Component } from "react";
import "./css/post.css";

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
    this.props.addComment(this.state.newCommentBody);
    this.setState({
      newCommentBody: ""
    });
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
