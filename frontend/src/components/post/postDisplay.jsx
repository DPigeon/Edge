import React, { Component } from "react";
import Post from "./post";
import PostEditor from "./postEditor";

class PostDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  /*componentDidMount() {
    fetch("http://localhost:3001/posts")
      .then(res => res.json())
      .then(json => {
        this.setState({
          posts: json
        });
      });
  }*/

  addPost = newPostBody => {
    const newState = Object.assign({}, this.state);
    newState.posts.push(newPostBody);
    this.setState(newState);
  };

  render() {
    return (
      <div className="post-body">
        {this.state.posts.map((postBody, idx) => {
          return <Post key={idx} postBody={postBody} />;
        })}
        <PostEditor addPost={this.addPost} />
      </div>
    );
  }
}

export default PostDisplay;
