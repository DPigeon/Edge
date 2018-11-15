import React, { Component } from "react";
import IndividualGroup from "../groups/individualGroup";
import "./styles/notify.css";

class Notify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationCounter: 1,
      email: "",
      items: []
    };
  }

  componentDidMount() {
    let jwt = localStorage.getItem("jwt");
    if (jwt === undefined || jwt === null) {
      //if the user not logged in
      this.props.history.replace("/login"); //go login
    }
    /*fetch(`http://localhost:8000/notifications/${this.props.email}`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(json => {
        this.setState({
          items: json
        });
      });*/
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

  receiveNotifications(email) {
    //do it for threads and profile (else if)
    if (this.state.notificationCounter > 0) {
      //with the jwt token, we look if the person looking at the page is in hierarchy
      return (
        <div>
          <h2>Notifications</h2>
          {this.state.items.map(item => (
            <div key={item.id}>
              <ul>
                <li>
                  <span className="navbar-text float-xs-right ml-auto">
                    <div className="dropdown">
                      <button className="btn btn-success dropdown-toggle dropbtn">
                        {this.state.notificationCounter}
                      </button>
                      <div className="dropdown-content">
                        <a href="/" className="dropdown-item">
                          {item} sent you a new message !
                          <br />
                          <button
                            className="btn btn-success"
                            onClick={() => this.dismissNotification(email)}
                          >
                            Dismiss
                          </button>
                        </a>
                      </div>
                    </div>
                  </span>
                </li>
              </ul>
            </div>
          ))}
        </div>
      );
    } else {
      return <div>No new notifications</div>; //if no notifications, don't show anything david
    }
  }

  dismissNotification(email) {
    fetch("http://localhost:8000/notifications", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: email
      })
    });
  }

  render() {
    //we can map an array of notifications coming from the backend so that we see all of them on hover
    //this is a simple notification example with messages, wall posts and group request
    return <div>{this.receiveNotifications("hi")}</div>;
  }
}

export default Notify;
