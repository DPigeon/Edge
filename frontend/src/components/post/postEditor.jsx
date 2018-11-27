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

  createPost = email => {
    if (this.state.newPostBody !== "") {
      //if the post is not empty
      //gets all posts
      this.props.addPost(this.state.newPostBody);
      this.setState({
        newPostBody: ""
      });
      fetch("http://localhost:8000/posts", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          jwt: localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          author_email: email,
          data: this.state.newPostBody
        })
      });
    }
  };

  render() {
    return (
      <div className="postEditor">
        <form id="ex" className="example">
          <input
            id="ppp"
            className="post"
            value={this.state.newPostBody}
            placeholder="Post something here.."
            onChange={this.handlePostChange}
          />
          <button
            className="btnn"
            onClick={() => this.createPost(this.props.email)}
            type="button"
          >
            Post
          </button>
        </form>
      </div>
    );
  }
}

export default PostEditor;
