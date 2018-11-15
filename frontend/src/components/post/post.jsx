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
      <div className="aPost">
        <div className="card">
          <h5>
            Post by <a href={"/user/" + this.props.by}>{this.props.by}</a>
          </h5>
          {this.props.postBody}
          <br />
          <br />
          <LikeDislike postId={this.props.postId} />
          <CommentDisplay
            email={this.props.emailOfPost}
            postId={this.props.postId}
          />
        </div>
      </div>
    );
  }
}

export default Post;
