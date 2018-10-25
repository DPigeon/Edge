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
      <div className="Home">
        <div className="lander">
          <h1>Edge</h1>
          <p>A simple parent-teacher communication</p>
        </div>
        <PostDisplay />
        {this.showLogoutButton()}
      </div>
    );
  }
}

//export default withAuth(Home);
export default Home;
