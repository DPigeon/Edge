import React, { Component } from "react";
import "./styles/index.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      isTeacher: false //checkbox
    };
  }

  componentDidMount() {
    let token = localStorage.getItem("jwt");
    if (token !== undefined && token !== null) {
      //if the user is logged in
      this.props.history.replace("/"); //go login
    }
  }

  validateForm() {
    //sees if all the inputs has something inside
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.firstname.length > 0 &&
      this.state.lastname.length > 0
    );
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

  handleFirstnameChange = event => {
    this.setState({
      firstname: event.target.value
    });
  };

  handleLastnameChange = event => {
    this.setState({
      lastname: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  handleChangeCheckBox = () => {
    this.setState({
      isTeacher: !this.state.isTeacher
    });
  };

  addAccount = (fname, lname, e, pass, teach) => {
    fetch("http://localhost:8000/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstname: fname,
        lastname: lname,
        email: e,
        password: pass,
        is_teacher: teach
      })
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.success) {
          this.props.history.replace("/login"); //redirects to home page
          alert("You have been registered successfully. You may now login.");
        } else {
          console.log(json);
        }
      });
  };

  render() {
    return (
      <div className="modal-login">
        <h1>Register now !</h1>
        <form id="FormRegister" onSubmit={this.handleSubmit} novalidate>
          <div class="form-group">
            <input
              type="firstname"
              value={this.state.firstname}
              onChange={this.handleFirstnameChange}
              class="form-control"
              placeholder="First Name"
            />
            <small id="HelpBlockFirstName" class="form-text text-muted">
              Please enter your first name.
            </small>
            <input
              type="lastname"
              value={this.state.lastname}
              onChange={this.handleLastnameChange}
              class="form-control"
              placeholder="Last Name"
            />
            <small id="HelpBlockLastName" class="form-text text-muted">
              Please enter your last name.
            </small>
            <input
              type="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
              class="form-control"
              placeholder="Email"
            />
            <small id="HelpBlockEmail" class="form-text text-muted">
              Please enter a valid email.
            </small>
            <input
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              class="form-control"
              placeholder="Password"
            />
            <small id="HelpBlockPassword" class="form-text text-muted">
              Please enter your password. It must be 8 to 20 characters long.
            </small>
          </div>
          <div class="form-group form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="CheckBoxTeacher"
              defaultChecked={this.state.isTeacher}
              onChange={this.handleChangeCheckBox}
            />
            <label class="form-check-label" for="CheckBoxTeacher">
              Are you a teacher ?
            </label>
          </div>
          <button
            className="btn btn-success"
            disabled={!this.validateForm()}
            type="submit"
            onClick={() =>
              this.addAccount(
                this.state.firstname,
                this.state.lastname,
                this.state.email,
                this.state.password,
                this.state.isTeacher
              )
            }
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}
