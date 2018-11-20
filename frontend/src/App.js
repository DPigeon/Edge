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
            //"nav-item"
            //"nav-link"
            return (
                <li className="nael">
                    <a href="/login">Login</a>
                </li>
            );
        }
    }

    showNavBarInfoWhenLoggedOutSignup() {
        let token = localStorage.getItem("jwt");
        if (token === undefined || token === null) {
            //if the user is logged in, show infos
            //"nav-item"
            //"nav-link"
            return (
                <li className="navel">
                    <a href="/signup">Signup</a>
                </li>
            );
        }
    }

    showNavBarInfoWhenLoggedInProfile() {
        let token = localStorage.getItem("jwt");
        if (token !== undefined && token !== null) {
            //if the user is logged in, show infos
            //"nav-item"
            //"nav-link"
            return (
                <li className="navel">
                    <a href="/profile">Profile</a>
                </li>
            );
        }
    }

    showNavBarInfoWhenLoggedInMessages() {
        let token = localStorage.getItem("jwt");
        if (token !== undefined && token !== null) {
            //if the user is logged in, show infos
            //"nav-item"
            //"nav-link"
            return (
                <li className="navel">
                    <a href="/threads">Messages</a>
                </li>
            );
        }
    }

    showNavBarInfoWhenLoggedInGroups() {
        let token = localStorage.getItem("jwt");
        if (token !== undefined && token !== null) {
            //if the user is logged in, show infos
            //"nav-item"
            //"nav-link"
            return (
                <li className="navel">
                    <a href="/groups">Groups</a>
                </li>
            );
        }
    }

    showUserInfo() {
        let token = localStorage.getItem("jwt");
        if (token !== undefined && token !== null) {
            //if the user is logged in, show infos
            //"navbar-text float-xs-right ml-auto"
            //"btn btn-dark"
            return (
                <li className="right">
                    <Notify email={this.state.userProfile.email} />
                    <button className="out" onClick={() => this.handleLogout()}>
                        Logout
                    </button>
                </li>
            );
        }
    }

    handleLogout = () => {
        localStorage.removeItem("jwt");
        window.location.reload();
    };

    render() {
        return (
            <div className="contain">
                <ul className="topnav">
                    <li className="homez">
                        <a className="active" href="/">
                            <img
                                src={require("./components/profile/images/logo2.png")}
                                alt="logo"
                                className="logo"
                            />
                        </a>
                    </li>

                    {this.showNavBarInfoWhenLoggedOutSignup()}
                    {this.showNavBarInfoWhenLoggedOutLogin()}
                    {this.showNavBarInfoWhenLoggedInProfile()}
                    {this.showNavBarInfoWhenLoggedInMessages()}
                    {this.showNavBarInfoWhenLoggedInGroups()}

                    {this.showUserInfo()}
                </ul>
                <br />
                <div className="logooo">
                    <center>
                        <img
                            src={require("./components/profile/images/logo2.png")}
                            alt="logo"
                            className="logoo"
                        />
                        <h2>Edge Portal, Parent-Teacher Social Media </h2>
                    </center>
                </div>
                <Routes />
            </div>
        );
    }
}

export default App;
