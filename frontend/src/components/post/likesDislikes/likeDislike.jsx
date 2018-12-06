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

  handleLike = (email, postId) => {
    console.log(email, postId); //gets the post id
    if (this.state.liked === true) {
      //if the post is liked by you, do not add a new like, delete it
      /*fetch("http://localhost:8000/likes", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
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
          "Content-Type": "application/json"
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
    if (this.state.disliked === true) {
      /*fetch("http://localhost:8000/likes", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
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
          "Content-Type": "application/json"
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

  getLengthOfLikes(postId) {
    var length = this.state.counterLike;
    for (var i = 0; i < this.props.likes.length; i++) {
      if (postId === this.props.likes[i].post_id) {
        this.setState({
          counterLike: this.state.counterLike + 1
        }); //calculates the length every time it sees a post with same post id
      }
      return length;
    }
  }

  getLengthOfDislikes(postId) {
    var length = this.state.counterDislike;
    for (var i = 0; i < this.props.dislikes.length; i++) {
      if (postId === this.props.dislikes[i].post_id) {
        length = length + 1; //calculates the length every time it sees a post with same post id
      }
      return length;
    }
  }

  setWhoLikedByPostId(postId) {
    var emails = [];
    for (var i = 0; i < this.props.likes.length; i++) {
      if (postId === this.props.likes[i].post_id) {
        emails = this.props.likes[i].email;
        this.setState({ arrayEmails: emails });
      }
    }
    //this.setState({ arrayEmails: emails });
    //console.log(this.state.arrayEmails);
    return this.state.arrayEmails;
  }

  getWhoDislikedByPostId(postId) {
    for (var i = 0; i < this.props.dislikes.length; i++) {
      if (postId === this.props.dislikes[i].post_id)
        return this.props.dislikes[i].email;
    }
  }

  getLikes(email, postId) {
    //must show your linked/disliked and the length on them
    for (var i = 0; i < this.props.likes.length; i++) {
      if (postId === this.props.likes[i].post_id)
        return this.props.likes[i].email;
    }
  }

  getDislikes(email, postId) {
    for (var i = 0; i < this.props.likes.length; i++) {
      if (postId === this.props.likes[i].post_id)
        return this.props.likes[i].email;
    }
  }

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
          {this.getLengthOfLikes(this.props.postId)} people liked this post
          {this.setWhoLikedByPostId(this.props.postId).map(item => (
            <div className="Like List">
              <li key={item.id}>
                <div className="itemLike">
                  {item}
                  <h5>
                    <a href={`/users/` + item}>{item}</a>
                  </h5>
                </div>
              </li>
            </div>
          ))}
        </div>
      </Popup>
    );
  }

  triggerLikeButton() {
    return (
      <div className="likecount">
        {this.getLengthOfLikes(this.props.postId)}
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
          {this.getLengthOfDislikes(this.props.postId)} people disliked this
          post
        </div>
      </Popup>
    );
  }

  triggerDislikeButton() {
    return (
      <div className="dislikecount">
        {this.getLengthOfDislikes(this.props.postId)}
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
    const label2 = this.state.disliked ? "Undislike" : "Dislike";
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
          {label2}
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
