import React, { Component } from "react";
import PostDisplay from "./post/postDisplay";
import decode from "jwt-decode";
import "./Home.css";

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
    fetch("http://localhost:8000/posts", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        jwt: localStorage.getItem("jwt")
      }
    })
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
          <center>
            <img
              src={require("./images/cal.jpg")}
              alt="Calendar"
              className="img1"
            />
          </center>
          <div className="container">
            <h2>Calendar</h2>
            <p className="title">
              {year}-{year + 1}
            </p>
            <p>
              {monthName[month]} {date}
            </p>
            <p>Academic Calendar</p>
          </div>
        </div>
      </div>
    );
  }

  showMiddleColumn() {
    return (
      <div className="column2">
        <div className="card">
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
      </div>
    );
  }

  showRightColumn() {
    return (
      <div className="column3">
        <div className="card">
          <center>
            <img
              src={require("./images/profile.png")}
              alt="Profile"
              className="img1"
            />
          </center>
          <div className="container">
            <h2>Child Name A </h2>
            <p className="title">className A</p>
            <p>Some text that describes</p>
            <p>example@example.com</p>
          </div>
        </div>
        <div className="card">
          <div className="container">
            <h2>Announcement</h2>
            <p className="title">Midterm</p>
            <p>Some text that describes</p>
            <p>Midterms are next week</p>
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
