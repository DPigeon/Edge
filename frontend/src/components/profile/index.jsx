import React, { Component } from "react";
import Home from "../Home";
import Popup from "reactjs-popup";
import decode from "jwt-decode";
import "./styles/profile.css";
import PostDisplay from "../post/postDisplay";

//your profile page
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.infos = new Home();
    this.state = {
      users: [],
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

  componentDidMount() {
    const { emailName } = this.props.match.params; //gets the username from the url
    this.setState({
      email: emailName
    });
    let jwt = localStorage.getItem("jwt");
    if (jwt === undefined || jwt === null) {
      //if the user not logged in
      this.props.history.replace("/login"); //go login
    } else {
      // if is logged in, get user profile
      this.decodeJwtToken();
    }
    //To finish profiles, we need the backend now to GET /signup or /users or whatever to be able to show any profiles

    fetch(`http://localhost:8000/users`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        jwt: localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(json => {
        this.setState({
          users: json //stores the user info of that page url into an array to get the info easily
        });
      });
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
    var labelTeacher = "";
    if (this.findTheUserToShow().is_teacher === 0) {
      //if it is not a teacher
      labelTeacher = "Parent";
    } else {
      labelTeacher = "Teacher";
    }
    return labelTeacher;
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

  showUpdateInfoButton() {
    if (this.state.userProfile.email === this.props.match.params.email) {
      // if the email on jwt matches the email on the user/url
      return <button className="editpic"> Update Info </button>;
    } else {
    }
  }

  //to use the following above, you do {findTheUserToShow().email, .lastname, .firstname, etc}
  findTheUserToShow() {
    //Finds the user profile (array) on the database and outputs an array of the user to show
    var newArray = [];
    for (var i = 0; i < this.state.users.length; i++) {
      if (this.props.match.params.email === this.state.users[i].email) {
        newArray = this.state.users[i];
      }
    }
    return newArray;
  }

  render() {
    const modalStyle = {
      width: "500px"
    };
    //console.log(this.findTheUserToShow());
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
              trigger={this.showUpdateInfoButton()}
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
              {this.findTheUserToShow().firstname}{" "}
              {this.findTheUserToShow().lastname}
              <br />
              <h5> {this.getTeacher()}</h5>
              <h6>
                <a href={"/threads?toMsg=" + this.props.match.params.email}>
                  {this.props.match.params.email}
                </a>
              </h6>
              <br />
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
