import React, { Component } from "react";
import "./css/profile.css";
import decode from "jwt-decode";

 export default class Profile extends Component {
	 constructor(props){
		 super(props);
  this.state = {
	userProfile: [],
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  };
}
  
  getToken() {
    // Retrieves the user token jwt from localStorage
    return localStorage.getItem("jwt");
  }
  
  getProfile() {
    // Using jwt-decode npm package to decode the token
    return decode(this.getToken());
  }

  componentDidMount() {
    let jwt = localStorage.getItem("jwt");
    if (jwt == undefined || jwt == null) {
      //if the user not logged in
      this.props.history.replace("/login"); //go login
    } else { // if is logged in, get user profile
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
        </div>
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
            <button onClick={e => this.onEdit(e)}> Edit </button>
            <button onClick={e => this.onSubmit(e)}> Save </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
