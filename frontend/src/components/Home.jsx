import React, { Component } from "react";
import PostDisplay from "./post/postDisplay";
import decode from "jwt-decode";
import "./Home.css";
import Calendar from "react-calendar";
import Clock from "react-live-clock";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: [],
      items: [],
      arrayComments: [],
      arrayLikes: [],
      arrayDislikes: []
    };
  }

  decodeJwtToken() {
    try {
      const profile = this.getProfile();
      this.setState({
        userProfile: profile
      });
    } catch (err) {
      localStorage.removeItem("jwt"); //if an error occurs while decoding jwt token, logout
      this.props.history.replace("/login");
    }
  }

  getToken() {
    // Retrieves the user token jwt from localStorage
    return localStorage.getItem("jwt");
  }

  getProfile() {
    // Using jwt-decode npm package to decode the token
    return decode(this.getToken());
  }

  componentDidMount() {
    let jwt = localStorage.getItem("jwt");
    if (jwt === undefined || jwt === null) {
      //if the user not logged in
      this.props.history.replace("/login"); //go login
    } else {
      // if is logged in, get user profile
      this.decodeJwtToken();
    }
    fetch("http://localhost:8000/posts")
      .then(res => res.json())
      .then(json => {
        this.setState({
          items: json.postList.reverse() //posts get into a stack/array
        });
        this.setCommentList(this.state.items);
        this.setLikeList(this.state.items);
        this.setDislikeList(this.state.items);
      });
  }

  setCommentList(newArray) {
    let array = [];

    for (var i = 0; i < newArray.length; i++) {
      array[i] = newArray[i].commentList;
    }
    this.setState({ arrayComments: array });
  }

  setLikeList(newArray) {
    let array = [];

    for (var i = 0; i < newArray.length; i++) {
      array[i] = newArray[i].likeList;
    }
    this.setState({ arrayLikes: array });
  }

  setDislikeList(newArray) {
    let array = [];

    for (var i = 0; i < newArray.length; i++) {
      array[i] = newArray[i].dislikeList;
    }
    this.setState({ arrayDislikes: array });
  }

  getPostList() {
    return this.state.items;
  }

  getCommentList() {
    return this.state.arrayComments;
  }

  getLikeList() {
    return this.state.arrayLikes;
  }

  getDislikeList() {
    return this.state.arrayDislikes;
  }

  showLeftColumn() {
    var date = new Date().getDate(); //gets the date
    var month = new Date().getMonth(); //gets the month
    var year = new Date().getFullYear(); //gets the year
    const monthName = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    return (
      <div className="column">
        <br />
        <div className="card">
          <center>
            <img
              src={require("./images/profile.png")}
              alt="Profile"
              className="img1"
            />
          </center>
          <div className="container">
            <h2>
              {this.state.userProfile.firstname}{" "}
              {this.state.userProfile.lastname}
            </h2>
            <p className="title">Parent A</p>
            <p>{this.state.userProfile.email}</p>
          </div>
        </div>

        <div className="card">
          <b className="date">
            {month + 1} / {date} / {year}
          </b>

          <Calendar />
        </div>
      </div>
    );
  }

  showMiddleColumn() {
    return (
      <div className="column2">
        <br />

        <div id="con" className="containernode">
          <PostDisplay
            email={this.state.userProfile.email}
            posts={this.getPostList()}
            comments={this.getCommentList()}
            likes={this.getLikeList()}
            dislikes={this.getDislikeList()}
          />
        </div>
      </div>
    );
  }

  showRightColumn() {
    return (
      <div className="column3">
        <br />
        <div className="card">
          <center>
            <b className="current">Current Time</b>
            <br />
            <Clock
              className="time"
              format={"HH:mm:ss"}
              ticking={true}
              timezone={"Canada/Eastern"}
            />
          </center>
        </div>
        <div className="card">
          <div className="container">
            <center>
              <b className="current"> Announcements</b>

              <br />
              <br />
              <p>Nothing for the moment</p>
            </center>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.showLeftColumn()}
        {this.showMiddleColumn()}
        {this.showRightColumn()}
        <div className="Home">
          <div className="lander" />
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
