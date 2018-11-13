import React, { Component } from "react";
import IndividualGroup from "../groups/individualGroup";
import "./styles/notify.css";

class Notify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationCounter: 0,
      //notifications: 0,
      email: ""
    };
  }

  componentWillReceiveProps() {
    //GET them on navbar by email because it is unique

    fetch("http://localhost:3001/signup/" + this.getEmail())
      .then(res => res.json())
      .then(json => {
        this.setState({
          notifications: json
        });
      });
  }

  componentDidMount() {
    let jwt = localStorage.getItem("jwt");
    if (jwt === undefined || jwt === null) {
      //if the user not logged in
      this.props.history.replace("/login"); //go login
    }
  }

  getEmail() {
    this.setState({
      email: this.props.email
    });
    return this.state.email;
  }

  incrementNotificationHandler = email => {
    this.setState({
      notificationCounter: this.state.notificationCounter + 1
    });
    fetch("http://localhost:3001/signup?email=" + email, {
      //need to get it by id (how do you get the id if you have the email ?)
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        notifications: this.state.notificationCounter
      })
    });
  };

  decrementNotificationHandler = () => {
    this.setState({
      notificationCounter: this.state.notificationCounter - 1
    });
  };

  showNotifications(type, name) {
    //either of type message or post
    switch (type) {
      case 1:
        return (
          <a className="dropdown-item" href="/threads">
            Message from {name}
          </a>
        );
      case 2:
        return (
          <a className="dropdown-item" href="/">
            Post in your wall from {name}
          </a>
        );
      default:
        break;
    }
  }

  render() {
    //we can map an array of notifications coming from the backend so that we see all of them on hover
    //this is a simple notification example with messages, wall posts and group request
    return (
      <span className="navbar-text float-xs-right ml-auto">
        <div className="dropdown">
          <button className="btn btn-success dropdown-toggle dropbtn">
            {this.state.notificationCounter}
          </button>
          <div className="dropdown-content">
            <a className="dropdown-item" href="/threads">
              Message from David
            </a>
            <a className="dropdown-item" href="/">
              New post on your wall from Anas
            </a>
            <a href="/" className="dropdown-item">
              Maria wants to join your group SOEN
              <br />
              <button
                className="btn btn-success"
                onClick={() =>
                  this.incrementNotificationHandler("d_pig@encs.concordia.ca")
                }
              >
                Accept
              </button>
              <button className="btn btn-danger" onClick={IndividualGroup}>
                Reject
              </button>
            </a>
          </div>
        </div>
      </span>
    );
  }
}

export default Notify;
