import React, { Component } from "react";
import CommentDisplay from "./comments/commentDisplay";
import LikeDislike from "./likesDislikes/likeDislike";
import "./styles/post.css";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="card">
        <div className="posttext">
          <h6>
            Post by <a href={"/user/" + this.props.by}>{this.props.by}</a>
          </h6>

          {this.props.postBody}
        </div>
        <LikeDislike
          id={this.props.id}
          email={this.props.emailOfPost}
          posts={this.props.posts}
          postId={this.props.postId}
          likes={this.props.likes}
          dislikes={this.props.dislikes}
        />
        <CommentDisplay
          id={this.props.id}
          email={this.props.emailOfPost}
          posts={this.props.posts}
          comments={this.props.comments}
          postId={this.props.postId}
        />
      </div>
    );
  }
}

export default Post;
