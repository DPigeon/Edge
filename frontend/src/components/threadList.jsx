import React, { Component } from "react";
import AuthService from "./login/authService";
import Messager from "./messager";
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

  showColumn1() {
    return (
      <div className="col1">
        <ul>
          <li>Compose</li>
          <li>Inbox</li>
          <li>Sent</li>
          <li>Contacts</li>
        </ul>
      </div>
    );
  }

  showColumn2() {
    var { isLoaded, threads } = this.state;
    if (!isLoaded) {
      return <div> Loading the threads, please wait... </div>;
    } else {
      return (
        <div className="col2">
          <div className="ThreadList">
            {threads.map(item => (
              <div className="containermessage">
                <h10>
                  <div className="boxmessage" key={item.id}>
                    <a href="messages/id">
                      Message from {item.from} - Subject: {item.subject}
                    </a>
                  </div>
                </h10>
              </div>
            ))}
            <center>
              <button
                className="newm"
                onClick={() => this.createThread(this.state.id)}
              >
                New Message
              </button>
            </center>
          </div>
        </div>
      );
    }
  }

  showColumn3() {
    return (
      <div className="col3">
        <Messager />
      </div>
    );
  }

  createThread = id => {};

  render() {
    return (
      <React.Fragment>
        <div className="containerbox">
          {this.showColumn1()}
          {this.showColumn2()}
          {this.showColumn3()}
        </div>
      </React.Fragment>
    );
  }
}

export default ThreadList;
