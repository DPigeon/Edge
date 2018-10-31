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

  componentDidMount() {
    //GET Likes/Dislikes
    fetch("http://localhost:3001/likes")
      .then(res => res.json())
      .then(json => {
        this.setState({
          items: json
        });
      });
  }

  handleLike = id => {
    this.setState({
      liked: !this.state.liked,
      counterLike: this.state.counterLike + 1,
      isDislikeButtonDisabled: true
    });
    fetch("http://localhost:3001/posts/" + id, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        likes: this.state.counterLike
      })
    });

    if (this.state.counterLike >= 1) {
      this.setState({
        liked: !this.state.liked,
        counterLike: this.state.counterLike - 1,
        isDislikeButtonDisabled: false
      });
      fetch("http://localhost:3001/posts" + id, {
        method: "PATCH",
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
  handleDislike = id => {
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
    //const textLike = this.state.liked ? "liked" : "haven't liked";
    const label = this.state.liked ? "Unlike" : "Like";
    //const textDislike = this.state.disliked ? "disliked" : "haven't disliked";
    const label2 = this.state.disliked ? "Undislike" : "Dislike";
    return (
      <div className="box">
        <span className="badge m-2 badge-primary">
          {this.state.counterLike}
        </span>
        <button
          className="btn btn-primary"
          onClick={() => this.handleLike(this.state.postID)}
          disabled={this.state.isLikeButtonDisabled}
        >
          {label}
        </button>
        <span className="badge m-2 badge-dark">
          {this.state.counterDislike}
        </span>
        <button
          className="btn badge-dark"
          onClick={() => this.handleDislike(this.state.postID)}
          disabled={this.state.isDislikeButtonDisabled}
        >
          {label2}
        </button>
      </div>
    );
  }
}

export default LikeDislike;
