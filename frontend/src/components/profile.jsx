import React, { Component } from "react";
import AuthService from "./login/authService";
import "./css/profile.css";

const Auth = new AuthService("http://localhost:3001");

export default class Profile extends Component {
  state = {
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
    );
  }
}
