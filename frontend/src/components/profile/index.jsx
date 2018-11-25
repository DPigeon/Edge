import React, { Component } from "react";
import Home from "../Home";
import Popup from "reactjs-popup";
import decode from "jwt-decode";
import "./styles/profile.css";
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
      isTeacher: false,
      selectedFile: null,
      items: [],
      arrayComments: [],
      arrayLikes: [],
      arrayDislikes: []
    };
  }
  fileChangedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  uploadHandler = () => {
    console.log(this.state.selectedFile);
  };

  fileChangedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  uploadHandler = () => {
    console.log(this.state.selectedFile);
  };

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
    const modalStyle = {
      width: "500px"
    };
    return (
      <React.Fragment>
        <div className="profilecontainer">
          <div className="imagecontainer">
            <img
              src={require("./images/profile.png")}
              alt="profile"
              className="pp"
            />
            <Popup
              contentStyle={modalStyle}
              trigger={<button className="editpic"> Update Info </button>}
              modal
              closeOnDocumentClick
            >
              <div className="editcontainer">
                <div className="profile">
                  <h4>
                    <b>Edit your profile</b>
                  </h4>
                  <br />

                  <form>
                    <div className="mod">
                      <b>First Name</b> <br />
                      <input
                        name="firstName"
                        placeholder="First Name"
                        onChange={e => this.change(e)}
                      />
                    </div>
                    <br />
                    <br />

                    <div className="mod">
                      <b> Last Name </b> <br />
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
                      <b>Email </b>
                      <br />
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
                      <b> Password </b>
                      <br />
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
                      <b>Profile Picture</b>
                      <br />
                      <input
                        type="file"
                        name="profile"
                        className=""
                        accept="image/png, image/jpeg"
                      />
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className="imageedit">
                      <b>Banner Picture</b>
                      <br />
                      <input
                        type="file"
                        name="banner"
                        className="hi"
                        accept="image/png, image/jpeg"
                      />
                    </div>
                    <br />
                    <br />
                    <br />

                    <button className="uploadbutton">
                      Update informations
                    </button>
                  </form>
                </div>
              </div>
            </Popup>
            <h3>
              {this.state.userProfile.firstname}{" "}
              {this.state.userProfile.lastname}
              <br />
              <h5> {labelTeacher}</h5>
            </h3>
            <img
              src={require("./images/banner.jpg")}
              alt="Welcome"
              className="banner"
            />
          </div>
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

          <div className="postspace">
            <PostDisplay
              email={this.state.userProfile}
              posts={this.state.items}
              comments={this.state.arrayComments}
              likes={this.state.arrayLikes}
              dislikes={this.state.arrayDislikes}
            />
          </div>
          <br />
        </div>
      </React.Fragment>
    );
  }
}
