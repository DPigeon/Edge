import React, { Component } from "react";
import Home from "../Home";
import ImageUploader from "react-images-upload";
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

  render() {
    const labelTeacher = this.state.isTeacher ? "Parent" : "Teacher";
    const modalStyle = {
      width: "600px"
    };
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
            contentStyle={modalStyle}
            trigger={<button className="editpic"> Update Info </button>}
            modal
            closeOnDocumentClick
          >
            <div className="editcontainer">
              <div className="profile">
                <h4>Edit your profile</h4>
                <br />

                <form>
                  <div className="mod">
                    First Name <br />
                    <input
                      name="firstName"
                      placeholder="First Name"
                      onChange={e => this.change(e)}
                    />
                  </div>
                  <br />
                  <br />

                  <div className="mod">
                    Last Name <br />
                    <input
                      className=""
                      name="lastName"
                      placeholder="Last Name"
                      onChange={e => this.change(e)}
                    />
                  </div>
                  <br />
                  <br />

                  <div className="mod">
                    Email <br />
                    <input
                      className=""
                      name="email"
                      placeholder="Email"
                      onChange={e => this.change(e)}
                    />
                  </div>
                  <br />
                  <br />

                  <div className="mod">
                    Password <br />
                    <input
                      className=""
                      name="password"
                      type="password"
                      placeholder="Password"
                      onChange={e => this.change(e)}
                    />
                  </div>
                  <br />
                  <br />
                  <div className="imageedit">
                    Profile Picture
                    <ImageUploader
                      withIcon={false}
                      buttonText="Choose image"
                      onChange={this.onDrop}
                      withLabel={false}
                      imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                      maxFileSize={5242880}
                      singleImage={true}
                    />
                  </div>

                  <div className="imageedit">
                    Banner Picture
                    <ImageUploader
                      fileContainerStyle=""
                      buttonClassName=""
                      className="imageup"
                      withIcon={false}
                      buttonText="Choose image"
                      onChange={this.onDrop}
                      withLabel={false}
                      imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                      maxFileSize={5242880}
                      singleImage={true}
                    />
                  </div>
                  <br />
                  <br />
                  <br />

                  <button className="uploadbutton">Update informations</button>
                </form>
              </div>
            </div>
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
