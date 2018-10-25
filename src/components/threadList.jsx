import React, { Component } from "react";
import AuthService from "./login/authService";
import "./css/messages.css";

const Auth = new AuthService("http://localhost:3001");

class ThreadList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threads: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    if (!Auth.loggedIn()) {
      //if the user not logged in
      this.props.history.replace("/login"); //go login
    }
    fetch("http://localhost:3001/threads")
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          threads: json
        });
      });
  }

  createThread = id => {};

  render() {
    var { isLoaded, threads } = this.state;
    if (!isLoaded) {
      return <div> Loading the threads, please wait... </div>;
    } else {
      return (
        <div className="ThreadList">
          {threads.map(item => (
            <div className="card listThread-editor listThread-body">
              <h10>
                <div className="card-title" key={item.id}>
                  <a href="messages/id">
                    Message from {item.from} - Subject: {item.subject}
                  </a>
                </div>
              </h10>
            </div>
          ))}
          <center>
            <button
              className="btn btn-success"
              onClick={() => this.createThread(this.state.id)}
            >
              New Message
            </button>
          </center>
        </div>
      );
    }
  }
}

export default ThreadList;
