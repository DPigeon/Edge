import React, { Component } from "react";
import decode from "jwt-decode";
import "./styles/notify.css";

class Notify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: [],
      items: [],
      threads: []
    };
  }

  componentDidMount() {
    let jwt = localStorage.getItem("jwt");
    let profile = decode(jwt); //decodes the jwt
    this.setState({
      userProfile: profile
    });
    if (jwt === undefined || jwt === null) {
      //if the user not logged in
      this.props.history.replace("/login"); //go login
    } else {
      fetch(`http://localhost:8000/notifications/${profile.email}`, {
        method: "GET"
      })
        .then(res => res.json())
        .then(json => {
          this.setState({
            items: json
          });
        });
    }
  }

  dismissNotification = (notificationId, email) => {
    fetch(`http://localhost:8000/notifications/${notificationId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: email
      })
    });
    window.location.reload();
  };

  getAllThreadsForId() {
    fetch(`http://localhost:8000/threads`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(json => {
        this.setState({
          threads: json
        });
      });
  }

  render() {
    //we can map an array of notifications coming from the backend so that we see all of them on hover
    //this is a simple notification example with messages, wall posts and group request
    return (
      <div className="navbar-text float-xs-right ml-auto">
        <div className="dropdown">
          <button className="btn btn-success dropdown-toggle dropbtn">
            {this.state.items.length}
          </button>
          {this.state.items.map(item => (
            <div className="dropdown-content">
              <a href className="dropdown-item">
                New message(s) in your message center ({this.state.items.length}
                )
                <br />
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    this.dismissNotification(item.id, item.user_id)
                  }
                >
                  Dismiss
                </button>
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Notify;
