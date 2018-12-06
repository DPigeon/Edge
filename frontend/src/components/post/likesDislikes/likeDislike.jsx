import React, { Component } from "react";
import Popup from "reactjs-popup";
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
      items: [],
      arrayEmails: []
    };
  }

  componentDidMount() {
    this.loadWhoLikedAndDisliked(); //shows if you already liked/disliked or not
  }

  loadWhoLikedAndDisliked() {
    //for likes
    for (var i = 0; i < this.props.posts[this.props.id].likeList.length; i++) {
      if (
        this.props.email ===
        this.props.posts[this.props.id].likeList.map(item => item.author_email)[
          i
        ]
      ) {
        this.setState({ liked: !this.state.liked });
      }
    }
    //for dislikes
    /*for (
      var j = 0;
      i < this.props.posts[this.props.id].dislikeList.length;
      j++
    ) {
      if (
        this.props.email ===
        this.props.posts[this.props.id].dislikeList.map(
          item => item.author_email
        )[j]
      ) {
        this.setState({ disliked: !this.state.disliked });
      }
    }*/
  }

  handleLike = (email, postId) => {
    console.log(email, postId); //gets the post id
    if (this.state.liked === true) {
      //if the post is liked by you, do not add a new like, delete it
      /*fetch("http://localhost:8000/likes", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        jwt: localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        author_email: email,
        dislike: false,
        post_id: postId
      })
    });*/
      this.setState({
        liked: !this.state.liked,
        counterLike: this.state.counterLike - 1,
        isDislikeButtonDisabled: false
      });
    } else {
      //otherwise, add a new like
      fetch("http://localhost:8000/likes", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          jwt: localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          author_email: email,
          dislike: false,
          post_id: postId
        })
      });
      this.setState({
        liked: !this.state.liked,
        counterLike: this.state.counterLike + 1,
        isDislikeButtonDisabled: true
      });
    }
  };

  handleDislike = (email, postId) => {
    console.log(email, postId); //gets the post id
    if (this.state.disliked === true) {
      /*fetch("http://localhost:8000/likes", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        jwt: localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        author_email: email,
        dislike: true,
        post_id: postId
      })
    });*/
      this.setState({
        disliked: !this.state.disliked,
        counterDislike: this.state.counterDislike - 1,
        isLikeButtonDisabled: false
      });
    } else {
      fetch("http://localhost:8000/likes", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          jwt: localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          author_email: email,
          dislike: true,
          post_id: postId
        })
      });
      this.setState({
        disliked: !this.state.disliked,
        counterDislike: this.state.counterDislike + 1,
        isLikeButtonDisabled: true
      });
    }
  };

  showPopUpLike() {
    const modalStyle = {
      width: "500px"
    };
    return (
      <Popup
        contentStyle={modalStyle}
        trigger={this.triggerLikeButton()}
        modal
        closeOnDocumentClick
      >
        <div className="editcontainer">
          {this.props.posts[this.props.id].likeList.length} people liked this
          post
          {this.props.posts[this.props.id].likeList.map((item, id) => (
            <div className="Like List" key={id}>
              <div className="itemLike">
                <a href={`/user/` + item.author_email}>{item.author_email}</a>
              </div>
            </div>
          ))}
        </div>
      </Popup>
    );
  }

  triggerLikeButton() {
    return (
      <div className="likecount">
        {this.props.posts[this.props.id].likeList.length}
      </div>
    );
  }

  showPopUpDislike() {
    const modalStyle = {
      width: "500px"
    };
    return (
      <Popup
        contentStyle={modalStyle}
        trigger={this.triggerDislikeButton()}
        modal
        closeOnDocumentClick
      >
        <div className="editcontainer">
          {this.props.posts[this.props.id].dislikeList.length} people disliked
          this post
          {this.props.posts[this.props.id].dislikeList.map((item, id) => (
            <div className="dislikelist" key={id}>
              <div className="itemDislike">
                <a href={`/user/` + item.author_email}>{item.author_email}</a>
              </div>
            </div>
          ))}
        </div>
      </Popup>
    );
  }

  triggerDislikeButton() {
    return (
      <div className="dislikecount">
        {this.props.posts[this.props.id].dislikeList.length}
      </div>
    );
  }

  showLikeCounter() {
    const label = this.state.liked ? "Unlike" : "Like";
    return (
      <div>
        {this.showPopUpLike()}
        <button
          className="like"
          onClick={() => this.handleLike(this.props.email, this.props.postId)}
          disabled={this.state.isLikeButtonDisabled}
        >
          {label}
        </button>
      </div>
    );
  }

  showDislikeCounter() {
    const label = this.state.disliked ? "Undislike" : "Dislike";
    return (
      <div>
        {this.showPopUpDislike()}
        <button
          className="dislike"
          onClick={() =>
            this.handleDislike(this.props.email, this.props.postId)
          }
          disabled={this.state.isDislikeButtonDisabled}
        >
          {label}
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className="likebox">
        {this.showLikeCounter()}
        {this.showDislikeCounter()}
      </div>
    );
  }
}

export default LikeDislike;
