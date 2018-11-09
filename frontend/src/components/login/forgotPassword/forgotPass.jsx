import React, { Component } from "react";

class ForgotPassword extends Component {
  state = {
    email: ""
  };

  sendEmail() {
    //TO DO
  }

  render() {
    return (
      <div>
        <form>
          <center>
            Enter your email to retrieve your password. An email will be sent to
            you afterwards to reset your password.
            <br />
            <br />
            <input placeholder="Email" type="email" />
            <br />
            <br />
            <button type="submit" onClick={this.sendEmail()}>
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
