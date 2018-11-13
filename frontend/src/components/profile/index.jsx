import React, { Component } from "react";
import Home from "../Home";
import UploadImages from "./uploadImages";
import decode from "jwt-decode";
import "./styles/profile.css";
import Popup from "reactjs-popup";
import PostDisplay from "../post/postDisplay";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.infos = new Home();
    this.state = {
      userProfile: [],
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      isTeacher: false
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

  getTeacher() {
    if (this.state.userProfile.is_teacher === 0)
      //if it is not a teacher
      this.setState({
        isTeacher: false
      });
    else
      this.setState({
        isTeacher: true
      });
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
      firstName: e.target.value,
      lastName: "",
      email: "",
      password: ""
    });
  };

  render() {
    const labelTeacher = this.state.isTeacher ? "Parent" : "Teacher";
    return (
      <React.Fragment>
        <div className="profilecontainer">
          <img
            src={require("./images/banner.jpg")}
            alt="Welcome"
            className="banner"
          />
          <center>
            <img
              src={require("./images/profile.png")}
              alt="profile"
              className="pp"
            />
          </center>
          <h3>
            {this.state.userProfile.firstname} {this.state.userProfile.lastname}
            <br />
            <h5> {labelTeacher}</h5>
          </h3>
          <br />
          <br />
          <br />

          <br />
          <br />

          <div className="picbox">
            <h2>Pictures</h2>
            <img
              src={require("./images/image1.jpg")}
              alt="img"
              className="pic"
            />
            <img
              src={require("./images/image2.jpg")}
              alt="img"
              className="pic"
            />
            <img
              src={require("./images/image3.jpg")}
              alt="img"
              className="pic"
            />
          </div>

          <Popup
            trigger={<button className="editpic"> Update Info </button>}
            modal
            closeOnDocumentClick
          >
            <span className="edit">
              <div className="profile">
                <h4>Edit your profile</h4>
                <br />
                <br />
                <form>
                  <div className="un">
                    <p>First Name </p>

                    <input
                      name="firstName"
                      placeholder="First Name"
                      value={this.state.userProfile.firstname}
                      onChange={e => this.change(e)}
                    />
                  </div>

                  <div className="deux">
                    <p>Last Name</p>
                    <input
                      className=""
                      name="lastName"
                      placeholder="Last Name"
                      value={this.state.userProfile.lastname}
                      onChange={e => this.change(e)}
                    />
                  </div>

                  <div className="trois">
                    <p>Email</p>
                    <input
                      className=""
                      name="email"
                      placeholder="Email"
                      value={this.state.userProfile.email}
                      onChange={e => this.change(e)}
                    />
                  </div>

                  <div className="quatre">
                    <p>Password</p>
                    <input
                      className=""
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={this.state.userProfile.password}
                      onChange={e => this.change(e)}
                    />
                  </div>
                  <div className="cinq">
                    <p>Profile Picture</p>
                    <UploadImages />
                  </div>
                  <div className="six">
                    <p>Banner Picture</p>
                    <UploadImages />
                  </div>
                  <button onClick={e => this.onEdit(e)}> Edit </button>
                  <button onClick={e => this.onSubmit(e)}> Save </button>
                </form>
                <center />
              </div>
            </span>
          </Popup>
          <br />
          <br />
          <br />
          <br />
        </div>
        <div className="postspace">
          <center>
            <PostDisplay />
          </center>
        </div>
      </React.Fragment>
    );
  }
}
