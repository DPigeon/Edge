import React, { Component } from "react";
import "./css/likeDislike.css";

class LikeDislike extends Component {
  constructor() {
    super();
    this.state = {
      liked: false,
      disliked: false,
      counterLike: 0,
      counterDislike: 0,
      isLikeButtonDisabled: false,
      isDislikeButtonDisabled: false
    };
  }

  handleLike = () => {
    this.setState({
      liked: !this.state.liked,
      counterLike: this.state.counterLike + 1,
      isDislikeButtonDisabled: true
    });
    if (this.state.counterLike >= 1) {
      this.setState({
        liked: !this.state.liked,
        counterLike: this.state.counterLike - 1,
        isDislikeButtonDisabled: false
      });
    }
  };

  handleDislike = () => {
    this.setState({
      disliked: !this.state.disliked,
      counterDislike: this.state.counterDislike + 1,
      isLikeButtonDisabled: true
    });
    if (this.state.counterDislike >= 1) {
      this.setState({
        disliked: !this.state.disliked,
        counterDislike: this.state.counterDislike - 1,
        isLikeButtonDisabled: false
      });
    }
  };

  render() {
    const textLike = this.state.liked ? "liked" : "haven't liked";
    const label = this.state.liked ? "Unlike" : "Like";
    const textDislike = this.state.disliked ? "disliked" : "haven't disliked";
    const label2 = this.state.disliked ? "Undislike" : "Dislike";
    return (
      <div className="box">
        <span className="badge m-2 badge-primary">
          {this.state.counterLike}
        </span>
        <button
          className="btn btn-primary"
          onClick={() => this.handleLike()}
          disabled={this.state.isLikeButtonDisabled}
        >
          {label}
        </button>
        <span className="badge m-2 badge-dark">
          {this.state.counterDislike}
        </span>
        <button
          className="btn badge-dark"
          onClick={() => this.handleDislike()}
          disabled={this.state.isDislikeButtonDisabled}
        >
          {label2}
        </button>
      </div>
    );
  }
}

export default LikeDislike;