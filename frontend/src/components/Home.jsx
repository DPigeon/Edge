import React, { Component } from "react";
import AuthService from "./login/authService";
import PostDisplay from "./post/postDisplay";
import withAuth from "./login/withAuth";
import "./css/Home.css";

const Auth = new AuthService("http://localhost:3001");

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (!Auth.loggedIn()) {
      //if the user not logged in
      this.props.history.replace("/login"); //go login
    }
  }

  showLeftColumn() {
    return (
      <div class="column">
        <div class="card">
          <center>
            <img
              src={require("./images/profile.png")}
              alt="Profile"
              className="img1"
            />
          </center>
          <div class="container">
            <h2>Parent name</h2>
            <p class="title">Parent A</p>
            <p>Some text that describes</p>
            <p>example@example.com</p>
          </div>
        </div>

        <div class="card">
          <center>
            <img
              src={require("./images/cal.jpg")}
              alt="Calendar"
              className="img1"
            />
          </center>
          <div class="container">
            <h2>Calendar</h2>
            <p class="title">2018-2019</p>
            <p>Some text that describes</p>
            <p>Academic calendar</p>
          </div>
        </div>
      </div>
    );
  }

  showMiddleColumn() {
    return (
      <div class="column2">
        <div class="card">
          <div id="con" class="containernode">
            <PostDisplay />
          </div>
        </div>

        <div class="card">
          <center>
            <img
              src={require("./images/welcome.jpg")}
              alt="Welcome"
              className="img2"
            />
          </center>
          <div class="container">
            <h2>Name Name</h2>
            <p class="title">Parent A</p>
            <p>Some text that describes</p>
            <p>example@example.com</p>
          </div>
        </div>
      </div>
    );
  }

  showRightColumn() {
    return (
      <div class="column3">
        <div class="card">
          <center>
            <img
              src={require("./images/profile.png")}
              alt="Profile"
              className="img1"
            />
          </center>
          <div class="container">
            <h2>Child Name A </h2>
            <p class="title">Class A</p>
            <p>Some text that describes</p>
            <p>example@example.com</p>
          </div>
        </div>
        <div class="card">
          <div class="container">
            <h2>Announcement</h2>
            <p class="title">Midterm</p>
            <p>Some text that describes</p>
            <p>Midterms are next week</p>
          </div>
        </div>
      </div>
    );
  }

  showLogoutButton() {
    if (Auth.loggedIn()) {
      return (
        <div className="logoutButton">
          <button
            className="btn btn-success"
            onClick={() => this.handleLogout()}
          >
            Logout
          </button>
        </div>
      );
    }
  }

  handleLogout = () => {
    Auth.logout();
    this.props.history.replace("/login");
  };

  render() {
    return (
      <React.Fragment>
        {this.showLogoutButton()}
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

//export default withAuth(Home);
export default Home;
