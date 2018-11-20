import React, { Component } from "react";
import "./styles/likeDislike.css";

class LikeDislike extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postID: props.postId,
      liked: false,
      disliked: false,
      counterLike: 0,
      counterDislike: 0,
      isLikeButtonDisabled: false,
      isDislikeButtonDisabled: false,
      items: []
    };
  }

  handleLike = (email, postId) => {
    this.setState({
      liked: !this.state.liked,
      counterLike: this.state.counterLike + 1,
      isDislikeButtonDisabled: true
    });
    fetch("http://localhost:8000/likes", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        author_email: email,
        dislike: true,
        post_id: postId
      })
    });

    if (this.state.counterLike >= 1) {
      this.setState({
        liked: !this.state.liked,
        counterLike: this.state.counterLike - 1,
        isDislikeButtonDisabled: false
      });
      fetch("http://localhost:8000/likes", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          //get the post id
          likes: this.state.counterLike
        })
      });
    }
  };
  handleDislike = (email, postId) => {
    this.setState({
      disliked: !this.state.disliked,
      counterDislike: this.state.counterDislike + 1,
      isLikeButtonDisabled: true
    });
    fetch("http://localhost:8000/likes", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        author_email: email,
        dislike: false,
        post_id: postId
      })
    });
    if (this.state.counterDislike >= 1) {
      this.setState({
        disliked: !this.state.disliked,
        counterDislike: this.state.counterDislike - 1,
        isLikeButtonDisabled: false
      });
    }
  };

  getLengthOfLikes(postId) {
    for (var i = 0; i < this.props.likes.length; i++) {
      if (postId === this.props.likes[i].post_id)
        return this.props.likes[i].length;
    }
  }

  render() {
    //const textLike = this.state.liked ? "liked" : "haven't liked";
    const label = this.state.liked ? "Unlike" : "Like";
    //const textDislike = this.state.disliked ? "disliked" : "haven't disliked";
    const label2 = this.state.disliked ? "Undislike" : "Dislike";
    return (
      <div className="likebox">
        <div className="likecount">{this.props.likes.length}</div>
        <button
          className="like"
          onClick={() => this.handleLike(this.props.email, this.props.postId)}
          disabled={this.state.isLikeButtonDisabled}
        >
          {label}
        </button>
        <div className="dislikecount">{this.props.dislikes.length}</div>
        <button
          className="dislike"
          onClick={() =>
            this.handleDislike(this.props.email, this.props.postId)
          }
          disabled={this.state.isDislikeButtonDisabled}
        >
          {label2}
        </button>
      </div>
    );
  }
}

export default LikeDislike;
