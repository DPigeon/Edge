import React, { Component } from "react";
import "./styles/post.css";

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
    //gets all posts
    this.props.addPost(this.state.newPostBody);
    this.setState({
      newPostBody: ""
    });
    fetch("http://localhost:8000/posts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "",
        msg: this.state.newPostBody,
        likes: 0,
        dislikes: 0
      })
    });
  };

  render() {
    return (
      <div className="postEditor">
        <form id="ex" class="example">
          <input
            id="ppp"
            class="post"
            value={this.state.newPostBody}
            placeholder="Post something here.."
            onChange={this.handlePostChange}
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
