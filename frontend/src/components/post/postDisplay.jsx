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

  /*getCommentsById() {
    for (var i = 0; i < this.state.comments.length; i++) {
      if (this.state.arrPost[i].id === this.state.comments[i].post_id) {
        return this.state.comments[i];
      }
    }
  }*/

  addPost = newPostBody => {
    window.location.reload();
    /*const newState = Object.assign({}, this.state);
    newState.posts.(newPostBody);
    this.setState(newState);*/
  };

  render() {
    return (
      <React.Fragment>
        <div className="card">
          <PostEditor addPost={this.addPost} email={this.props.email} />
        </div>

        <div className="postEdit">
          {this.props.posts.reverse().map((item, id) => {
            return (
              <Post
                key={id}
                postBody={item.data}
                from={item.author_email}
                posts={this.props.posts}
                postId={item.id}
                comments={this.props.comments}
                likes={this.props.likes}
                dislikes={this.props.dislikes}
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
