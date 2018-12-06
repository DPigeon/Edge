import React, { Component } from "react";

class ChangePassword extends Component {
  state = {
    password: "",
    email: ""
  };

  componentDidMount() {
    if (localStorage.getItem("jwt") !== null) {
      window.location.replace("/"); //go back to the dashboard
    } else {
      const { emailName } = this.props.match.params; //gets the username from the url
      this.setState({
        email: emailName
      });
    }
  }

  hasAccessToThePage() {
    //looks if the user is logout and has access (TODO)
    var access = false;
  }

  handleChange = event => {
    this.setState({
      password: event.target.value
    });
  };

  ProcessNewPassword = password => {
    if (password !== "") {
      fetch("http://localhost:8000/users/password", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
          //no jwt token needed here
        },
        body: JSON.stringify({
          email: this.props.match.params.email,
          password: password
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.success === true) {
            //if response is success
            window.location.replace("/login");
            alert("You successfully changed your password !");
          } else {
            alert("Error, please enter a proper password");
          }
        })
        .catch(error => {
          if (error.name === "AbortError") {
            console.error("error");
          }
        });
    } else {
      alert("Type a proper password !");
    }
  };

  render() {
    return (
      <div>
        <center>
          <br />
          <h3>Think of a good better password !</h3>
          <br />
          Type in your new password:
          <br />
          <input
            placeholder="Password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <button onClick={() => this.ProcessNewPassword(this.state.password)}>
            Change Password
          </button>
        </center>
        <br />
      </div>
    );
  }
}

export default ChangePassword;
