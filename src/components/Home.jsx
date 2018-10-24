import React, { Component } from "react";
import AuthService from "./login/authService";
import withAuth from "./login/withAuth";
import "./css/Home.css";

const Auth = new AuthService("http://localhost:3001");

class Home extends Component {
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
        <button className="btn btn-success" onClick={() => this.handleLogout}>
          Logout
        </button>
      </div>
    );
  }
}

//export default withAuth(Home);
export default Home;
