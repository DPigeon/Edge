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
            Post by <a href={"/user/" + this.props.by} />
          </h6>
          <br />
          {this.props.postBody}
          <br />
        </div>
        <LikeDislike postId={this.props.postId} />
        <CommentDisplay />
      </div>
    );
  }
}

export default Post;
