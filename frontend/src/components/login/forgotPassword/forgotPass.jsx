import React, { Component } from "react";
//David frontend, Anas backend

class ForgotPassword extends Component {
  state = {
    email: ""
  };

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
      }).then(response => {
        if (response.status === 201) {
          //if response is success
          window.location.replace("/recover");
        }
      });
    }
  };

  render() {
    return (
      <div>
        <form>
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
              onChange={this.handleChange}
            />
            <br />
            <br />
            <button
              type="submit"
              onClick={() => this.sendEmail(this.state.email)}
            >
              Send Email
            </button>
          </center>
          <br />
        </form>
      </div>
    );
  }
}

export default ForgotPassword;
