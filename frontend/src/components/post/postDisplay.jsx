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

  addPost = newPostBody => {
    window.location.reload();
  };

  render() {
    return (
      <React.Fragment>
        <div className="card">
          <PostEditor
            addPost={this.addPost}
            email={this.props.email}
            users={this.props.users}
            id={this.props.posts.id}
          />
        </div>

        <div className="postEdit">
          {this.props.posts.map((item, id) => {
            return (
              <Post
                id={id}
                key={id}
                postBody={item.data}
                posts={this.props.posts}
                postId={item.id}
                by={item.author_email}
                emailOfPost={this.props.email}
                users={this.props.users}
              />
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default PostDisplay;
