import React, { Component } from "react";
import EnterCode from "./enterCode";
//David frontend, Anas backend

class ForgotPassword extends Component {
  state = {
    email: ""
  };

  componentDidMount() {
    if (localStorage.getItem("jwt") !== null) {
      window.location.replace("/"); //go back to the dashboard
    }
  }

  handleChange = event => {
    this.setState({
      email: event.target.value
    });
  };

  sendEmail = email => {
    if (this.state.email !== "") {
      fetch("http://localhost:8000/recover", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
          //no jwt token needed here
        },
        body: JSON.stringify({
          email: email
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.success === true) {
            //if response is success
            alert("An email was sent to " + email);
            window.location.replace(`code/${email}`);
          } else {
            alert("Error, please enter a proper email");
          }
        })
        .catch(error => {
          if (error.name === "AbortError") {
            console.error("error");
          }
        });
    } else {
      alert("Enter an email!");
    }
  };

  render() {
    return (
      <div>
        <center>
          <br />
          <h3>
            Enter your email to retrieve your password.
            <br />
            An email will be sent to you afterwards to reset your password.
          </h3>
          <br />
          Type in your email address:
          <br />
          <input
            placeholder="Email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <button onClick={() => this.sendEmail(this.state.email)}>
            Send Email
          </button>
        </center>
        <br />
      </div>
    );
  }
}

export default ForgotPassword;
