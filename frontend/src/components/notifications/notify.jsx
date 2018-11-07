import React, { Component } from "react";
import IndividualGroup from "../groups/individualGroup";
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

  incrementNotificationHandler = () => {
    this.setState({
      notificationCounter: this.state.notificationCounter + 1
    });
  };

  decrementNotificationHandler = () => {
    this.setState({
      notificationCounter: this.state.notificationCounter - 1
    });
  };

  showNotifications(type, name, groupName) {
    //either of type message, post or group request
    switch (type) {
      case "message":
        return (
          <a className="dropdown-item" href="/threads">
            Message from {name}
          </a>
        );
      case "postWall":
        return (
          <a className="dropdown-item" href="/">
            Post in your wall from {name}
          </a>
        );
      case "groupRequest":
        return (
          <a className="dropdown-item" href="/groups">
            {name} wants to join your group {groupName}
            <br />
            <button className="btn btn-success" onClick={IndividualGroup}>
              Accept
            </button>
            <button className="btn btn-danger" onClick={IndividualGroup}>
              Reject
            </button>
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
            <a className="dropdown-item">
              Maria wants to join your group SOEN
              <br />
              <button
                className="btn btn-success"
                onClick={() => this.incrementNotificationHandler()}
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
