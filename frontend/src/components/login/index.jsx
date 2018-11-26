import React, { Component } from "react";
import "./styles/index.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    let token = localStorage.getItem("jwt");
    if (token !== undefined && token !== null) {
      //if the user is already logged in
      this.props.history.replace("/"); //go home
    }
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleEmailChange = event => {
    this.setState({
      email: event.target.value
    });
  };

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };

  handleAccountForm = event => {
    event.preventDefault();

    fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        jwt: localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.success) {
          console.log("token : ", json.token);
          localStorage.setItem("jwt", json.token);
          window.location.reload(); //Go back to dashboard
        } else {
          console.log(json);
        }
      });
  };

  render() {
    return (
      <div className="modal-login">
        <h1>Login</h1>
        <form id="FormLogin" onSubmit={this.handleAccountForm} noValidate>
          <div className="form-group">
            <input
              type="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
              className="form-control"
              placeholder="Email"
            />
            <input
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              className="form-control"
              placeholder="Password"
            />
          </div>
          <div className="form-group form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="CheckBoxTeacher"
            />
            <label className="form-check-label" htmlFor="CheckBoxTeacher">
              Remember Me
            </label>
          </div>
          <button
            className="btn btn-success"
            disabled={!this.validateForm()}
            type="submit"
            onClick={() => this.handleAccountForm}
          >
            Login
          </button>
        </form>
        <p className="message">Not Signed Up ?</p>
        <center>
          <a href="/signup">Register</a>
        </center>
        <p className="message">Forgot Your Password ?</p>
        <center>
          <a href="/forgotpassword">Retrieve Password</a>
        </center>
      </div>
    );
  }
}
