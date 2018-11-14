import React, { Component } from "react";
import "./App.css";
import decode from "jwt-decode";
import Routes from "./Routes";
import Home from "./components/Home";
import Notify from "./components/notifications/notify";

class App extends Component {
    constructor(props) {
        super(props);
        this.infos = new Home();
        this.state = {
            userProfile: []
        };
    }

    componentDidMount() {
        this.decodeJwtToken();
    }

    decodeJwtToken() {
        //refactor this code later
        try {
            const profile = this.getProfile();
            this.setState({
                userProfile: profile
            });
        } catch (err) {
            localStorage.removeItem("jwt"); //if an error occurs while decoding jwt token, logout
            //this.props.history.replace("/login");
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

    showNavBarInfoWhenLoggedOutLogin() {
        let token = localStorage.getItem("jwt");
        if (token === undefined || token === null) {
            //if the user is logged in, show infos
            return (
                <li className="nael">
                    <a href="/login">Login</a>
                </li>
            );
        }
    }
  }

 

  showNavBarInfoWhenLoggedInProfile() {
    let token = localStorage.getItem("jwt");
    if (token !== undefined && token !== null) {
      //if the user is logged in, show infos
      return (
        <li className="nav-item">
          <a className="nav-link" href="/profile">
            Profile
          </a>
        </li>
      );
    }
  }

  showNavBarInfoWhenLoggedInMessages() {
    let token = localStorage.getItem("jwt");
    if (token !== undefined && token !== null) {
      //if the user is logged in, show infos
      return (
        <li className="nav-item">
          <a className="nav-link" href="/threads">
            Messages
          </a>
        </li>
      );
    }
  }

  showNavBarInfoWhenLoggedInGroups() {
    let token = localStorage.getItem("jwt");
    if (token !== undefined && token !== null) {
      //if the user is logged in, show infos
      return (
        <li className="nav-item">
          <a className="nav-link" href="/groups">
            Groups
          </a>
        </li>
      );
    }
  }

  showUserInfo() {
    let token = localStorage.getItem("jwt");
    if (token !== undefined && token !== null) {
      //if the user is logged in, show infos
      return (
        <span className="navbar-text float-xs-right ml-auto">
          <Notify email={this.state.userProfile.email} />
          <button className="btn btn-dark" onClick={() => this.handleLogout()}>
            Logout
          </button>
        </span>
      );
    }
  }

  handleLogout = () => {
    localStorage.removeItem("jwt");
    window.location.reload();
  };

  render() {
    return (
      <div className="App cotainer">
        <nav className="navbar navbar-expand-lg bg-secondary">
          <a className="navbar-brand" href="/">
            <img
              src={require("./components/profile/images/logo.png")}
              alt="logo"
              className="logo"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="/">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              {this.showNavBarInfoWhenLoggedOutSignup()}
              {this.showNavBarInfoWhenLoggedOutLogin()}
              {this.showNavBarInfoWhenLoggedInProfile()}
              {this.showNavBarInfoWhenLoggedInMessages()}
              {this.showNavBarInfoWhenLoggedInGroups()}
              {}
            </ul>
            {this.showUserInfo()}
          </div>
        </nav>
        <center>
          <h1>Edge</h1>
          <p>A simple parent-teacher communication</p>
        </center>
        <Routes />
      </div>
    );
  }


export default App;
