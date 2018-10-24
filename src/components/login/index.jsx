import React, { Component } from "react";
import AuthService from "./authService";
import "./index.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService("http://localhost:3001"); // Our authentification for unique logins
    this.state = {
      accounts: [],
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    if (this.Auth.loggedIn()) {
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

    this.Auth.login(this.state.email, this.state.password)
      .then(res => {
        this.props.history.replace("/");
      })
      .catch(err => {
        alert(err);
      });
  };

  render() {
    return (
      <div className="modal-login">
        <h1>Login</h1>
        <form id="FormLogin" onSubmit={this.handleAccountForm} noValidate>
          <div class="form-group">
            <input
              type="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
              class="form-control"
              placeholder="Email"
            />
            <input
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              class="form-control"
              placeholder="Password"
            />
          </div>
          <div class="form-group form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="CheckBoxTeacher"
            />
            <label class="form-check-label" htmlFor="CheckBoxTeacher">
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
        <a href="/signup">Register</a>
        <p className="message">Forgot Your Password ?</p>
        <a href="/">Retrieve Password</a>
      </div>
    );
  }
}
