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
    let jwt = localStorage.getItem("jwt");
    if (jwt == undefined || jwt == null) {
      //if the user not logged in
      this.props.history.replace("/login"); //go login
    }
    fetch("http://localhost:8000/threads", {
      method: "GET"
    })
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
        <ul className="leftopt">
          <li>
            <a href="#">Compose</a>
          </li>
          <li>
            <a href="/">Inbox</a>
          </li>
          <li>
            <a href="/">Sent</a>
          </li>
          <li>
            <a href="/">Contacts</a>
          </li>
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
                    <ul>
                      <li>
                        <a href="messages/id">
                          {item.name}
                          <br />
                          Message from {item.sender}
                          <br />
                          03/06/18
                        </a>
                      </li>
                    </ul>
                  </div>
                </h10>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }

  showColumn3() {
    return (
      <div className="col3">
        <ul className="rightsend">
          <li>
            <a href="#">Send</a>
          </li>
        </ul>
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
