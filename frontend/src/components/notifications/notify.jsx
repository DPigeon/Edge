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
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          jwt: localStorage.getItem("jwt")
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({
            items: json.reverse()
          });
        });
    }
  }

  dismissNotification = (notificationId, email) => {
    fetch(`http://localhost:8000/notifications/${notificationId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        jwt: localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        user_id: email
      })
    });
    window.location.reload();
  };

  getAllThreadsForId(id) {
    fetch(`http://localhost:8000/threads/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        jwt: localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(json => {
        this.setState({
          threads: json
        });
      });
    return this.state.threads;
  }

  getUsers(email) {
    fetch(`http://localhost:8000/user/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        jwt: localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(json => {
        this.setState({
          users: json
        });
      });
    return this.state.threads;
  }

  showNotifications() {
    return (
      <div className="dropdown-content">
        <li>
          {this.state.items.map((item, id) => {
            if (item.thread_id === 90) {
              //if not a tag, show new messages
              return (
                <a href className="dropdown-item">
                  Your friend {item.tag_id} tagged you on a post
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
              );
            } else {
              return (
                <a href className="dropdown-item">
                  New message from{" "}
                  {this.getAllThreadsForId(item.thread_id).receiver}
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
              );
            }
          })}{" "}
        </li>
      </div>
    );
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
          {this.showNotifications()}
        </div>
      </div>
    );
  }
}

export default Notify;
