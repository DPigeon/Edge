import React, { Component } from "react";
import AuthService from "./login/authService";
import withAuth from "./login/withAuth";
import "./css/Home.css";

const Auth = new AuthService("http://localhost:3001");

class Home extends Component {
  state = {
    post: ""
  };

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

  handlePostChange = event => {
    this.setState({
      post: event.target.value
    });
  };

  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Edge</h1>
          <p>A simple parent-teacher communication</p>
        </div>
        <div className="postEditor">
          <form id="ex" class="example" onChange={this.handlePostChange}>
            <input id="ppp" class="post" placeholder="Post something here.." />
            <button class="btn btn-dark postButton" onClick="" type="button">
              Post
            </button>
          </form>
        </div>
        {this.showLogoutButton()}
      </div>
    );
  }
}

//export default withAuth(Home);
export default Home;
