import React, { Component } from "react";
import PostDisplay from "./post/postDisplay";
import decode from "jwt-decode";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: []
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
  }

  showLeftColumn() {
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
            <p>Successfully decoded the JWT Token</p>
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
            <p className="title">2018-2019</p>
            <p>Some text that describes</p>
            <p>Academic calendar</p>
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
            <PostDisplay email={this.state.userProfile.email} />
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
