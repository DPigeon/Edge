import React, { Component } from "react";
import AuthService from "./login/authService";
import "./css/profile.css";
import PostDisplay from "./post/postDisplay";
import Drop from "./drop";

const Auth = new AuthService("http://localhost:3001");

export default class Profile extends Component {
  state = {
    selectedFile: null,
    loaded: 0,
    firstName: "",
    lastName: "",
    email: localStorage.getItem("email"),
    password: ""
  };

  componentDidMount() {
    if (!Auth.loggedIn()) {
      //if the user not logged in
      this.props.history.replace("/login"); //go login
    }
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    console.log(this.state);
  };

  onEdit = e => {
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    });
    //e.preventDefault();
    //this.props.onEdit(this.state);
    //console.log(this.state);
  };

  render() {
    return (
      <React.Fragment>
        <div className="profilecontainer">
          <img
            src={require("./images/banner.jpg")}
            alt="Welcome"
            className="banner"
          />
          <center>
            {" "}
            <img
              src={require("./images/profile.png")}
              alt="profile"
              className="pp"
            />
          </center>
          <h3>Name Name</h3>
          <button className="editpic">Update Info</button>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>

        <PostDisplay />

        <div className="profile">
          <form>
            <input
              className=""
              name="firstName"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={e => this.change(e)}
            />
            <br />
            <input
              className=""
              name="lastName"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={e => this.change(e)}
            />
            <br />
            <input
              className=""
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={e => this.change(e)}
            />
            <br />
            <input
              className=""
              name="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={e => this.change(e)}
            />
            <br />

            <div className="App">
              <input
                type="file"
                name=""
                id=""
                onChange={this.handleselectedFile}
              />
              <button onClick={this.handleUpload}>Upload</button>
              <div> {Math.round(this.state.loaded, 2)} %</div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
