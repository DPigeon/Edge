import React, { Component } from "react";
import "./css/post.css";

class PostEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPostBody: ""
    };
  }

  handlePostChange = event => {
    this.setState({
      newPostBody: event.target.value
    });
  };

  createPost = () => {
    this.props.addPost(this.state.newPostBody);
    this.setState({
      newPostBody: ""
    });
  };

  render() {
    return (
      <div className="postEditor">
        <form id="ex" class="example" onChange={this.handlePostChange}>
          <input
            id="ppp"
            class="post"
            value={this.state.newPostBody}
            placeholder="Post something here.."
          />
          <button class="btnn" onClick={() => this.createPost()} type="button">
            Post
          </button>
        </form>
      </div>
    );
  }
}

export default PostEditor;
