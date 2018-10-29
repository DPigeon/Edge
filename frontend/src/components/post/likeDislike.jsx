import React, { Component } from "react";
import "./css/likeDislike.css";

class LikeDislike extends Component {
  constructor() {
    super();
    this.state = {
      liked: false,
      disliked: false,
      counter: 0
    };
  }

  handleLike = () => {
    this.setState({
      liked: !this.state.liked
    });
  };

  handleDislike = () => {
    this.setState({
      disliked: !this.state.disliked
    });
  };

  render() {
    const textLike = this.state.liked ? "liked" : "haven't liked";
    const label = this.state.liked ? "Unlike" : "Like";
    const textDislike = this.state.disliked ? "disliked" : "haven't disliked";
    const label2 = this.state.disliked ? "Undislike" : "Dislike";
    return (
      <div className="box">
        <button className="btn btn-primary" onClick={() => this.handleLike()}>
          {label}
        </button>
        <button className="btn badge-dark" onClick={() => this.handleDislike()}>
          {label2}
        </button>
        <p>you {textLike} this.</p>
        <p>you {textDislike} this.</p>
      </div>
    );
  }
}

export default LikeDislike;
