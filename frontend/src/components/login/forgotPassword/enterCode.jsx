import React, { Component } from "react";
import ChangePassword from "./changePassword";

class EnterCode extends Component {
  state = {
    code: "",
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
      code: event.target.value
    });
  };

  sendCode = code => {
    if (code !== "") {
      fetch("http://localhost:8000/recover/verify", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
          //no jwt token needed here
        },
        body: JSON.stringify({
          email: this.props.match.params.email,
          code: code
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.success === true) {
            //if response is success
            window.location.replace(
              `../newpassword/${this.props.match.params.email}`
            );
          } else {
            alert("Error, please enter a proper code");
          }
        })
        .catch(error => {
          if (error.name === "AbortError") {
            console.error("error");
          }
        });
    } else {
      alert("Type a proper code!");
    }
  };

  render() {
    //if (this.hasAccessToThePage() === true) {
    return (
      <div>
        <center>
          <br />
          <h3>Read your email and enter the code we sent you.</h3>
          <br />
          Type in your code:
          <br />
          <input
            placeholder="Code"
            type="number"
            value={this.state.code}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <button onClick={() => this.sendCode(this.state.code)}>
            Verify Code
          </button>
        </center>
        <br />
      </div>
    );
  } /*else {
      return (
        <div>
          <NotFound />
        </div>
      );
    }*/
  //}
}

export default EnterCode;
