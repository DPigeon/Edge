import React, { Component } from "react";
import "./styles/notify.css";

class Notify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationCounter: 3,
      notifications: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/notifications")
      .then(res => res.json())
      .then(json => {
        this.setState({
          notifications: json
        });
      });
  }

  showNotifications(type, name) {
    //either of type message or post
    this.setState({
      notificationCounter: this.state.notificationCounter + 1
    });
    switch (type) {
      case "message":
        return (
          <a className="dropdown-item" href="/threads">
            Message from {name}
          </a>
        );
      case "post":
        return (
          <a className="dropdown-item" href="/">
            Post from {name}
          </a>
        );
      default:
        break;
    }
  }

  render() {
    //we can map an array of notifications coming from the backend so that we see all of them on hover
    //this is a simple notification example
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
              New post from Ruslan
            </a>
            <a className="dropdown-item" href="/threads">
              Message from Maria
            </a>
          </div>
        </div>
      </span>
    );
  }
}

export default Notify;
