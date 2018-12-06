import React, { Component } from "react";
import CommentDisplay from "./comments/commentDisplay";
import LikeDislike from "./likesDislikes/likeDislike";
import Parser from "html-react-parser";
import "./styles/post.css";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = { postBody: "" };
  }

  /*replaceAt(string, index, replace) {
    //for (var i = 0; i < string.length; i++) {
    return string.substring(0, index) + replace + string.substring(index + 1);
    //}
  }

  findAtIndexInPosts() {
    var string = this.props.postBody;
    var at = string.indexOf("@");
    return at;
  }*/

  replaceByMention() {
    /*if (this.props.postBody.includes("@") === true) {
      return Parser(
        this.replaceAt(
          this.props.postBody,
          this.findAtIndexInPosts(),
          `<a href="">[@]</a>`
        )
      );
    } else {*/
    return <div>{Parser(this.props.postBody)}</div>;
    //}
  }

  render() {
    return (
      <div className="card">
        <div className="posttext">
          <h6>
            Post by <a href={"/user/" + this.props.by}>{this.props.by}</a>
          </h6>
          {this.replaceByMention()}
        </div>
        <LikeDislike
          id={this.props.id}
          email={this.props.emailOfPost}
          posts={this.props.posts}
          postId={this.props.postId}
        />
        <CommentDisplay
          id={this.props.id}
          email={this.props.emailOfPost}
          posts={this.props.posts}
          postId={this.props.postId}
          users={this.props.users}
        />
      </div>
    );
  }
}

export default Post;
