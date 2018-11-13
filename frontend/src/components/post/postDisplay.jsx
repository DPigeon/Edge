import React, { Component } from "react";
import Post from "./post";
import PostEditor from "./postEditor";

class PostDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
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
    newState.posts.unshift(newPostBody);
    this.setState(newState);
  };

  render() {
    return (
      <React.Fragment>
        <PostEditor addPost={this.addPost} email />

        <div className="postEditor">
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
                by={item.name}
              />
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default PostDisplay;
