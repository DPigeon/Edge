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
    fetch("http://localhost:8000/posts")
      .then(res => res.json())
      .then(json => {
        this.setState({
          items: json.postList //posts get into a stack/array
        });
      });
  }

  addPost = newPostBody => {
    window.location.reload();
    /*const newState = Object.assign({}, this.state);
    newState.posts.(newPostBody);
    this.setState(newState);*/
  };

  render() {
    return (
      <React.Fragment>
        <PostEditor addPost={this.addPost} email={this.props.email} />

        <div className="postEditor">
          {this.state.items.reverse().map((item, id) => {
            return (
              <Post
                key={id}
                postBody={item.data}
                from={item.author_email}
                postId={item.id}
                by={item.author_email}
                emailOfPost={this.props.email}
              />
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default PostDisplay;
