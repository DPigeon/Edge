import React, { Component } from "react";
import Post from "./post";
import PostEditor from "./postEditor";

class PostDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      items: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/posts")
      .then(res => res.json())
      .then(json => {
        this.setState({
          items: json //posts get into a stack/array
        });
      });
  }

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
        {this.state.items.map((item, id) => {
          return (
            <Post
              key={id}
              postBody={item.msg}
              from={item.from}
              postId={item.id}
            />
          );
        })}
        <PostEditor addPost={this.addPost} />
      </div>
    );
  }
}

export default PostDisplay;
