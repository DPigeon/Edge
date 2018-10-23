import React, { Component } from "react";
import "./index.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      email: "",
      password: ""
    };
  }

  componentDidMount() {}

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

  handleSubmit = event => {
    event.preventDefault();
  };

  lookForAccounts = (e, pass) => {
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: e,
        password: pass
      })
    });
    window.location.reload();
  };

  render() {
    return (
      <div className="modal-login">
        <h1>Login</h1>
        <form id="FormLogin" onSubmit={this.handleSubmit} novalidate>
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
            <label class="form-check-label" for="CheckBoxTeacher">
              Remember Me
            </label>
          </div>
          <button
            className="btn btn-success"
            disabled={!this.validateForm()}
            type="submit"
            onClick={() =>
              this.lookForAccounts(this.state.email, this.state.password)
            }
          >
            Login
          </button>
        </form>
        <p className="message">Not Signed Up ?</p>
        <a href="/signup">Register</a>
        <p className="message">Forgot Your Password ?</p>
        <a href="#">Retrieve Password</a>
      </div>
    );
  }
}
