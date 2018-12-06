import React, { Component } from "react";
import "./styles/messages.css";
import Notify from "../notifications/notify";

class Reply extends Component {
  constructor(props) {
    super(props);
    this.notify = new Notify();
    this.state = {
      to: "",
      message: "",
      aNotification: []
    };
  }

  componentDidMount() {}

  handleMessageEditorInputChange = event => {
    this.setState({
      message: event.target.value
    });
  };

  addMessage = (id, from, to, message) => {
    if (message !== "") {
      fetch(`http://localhost:8000/messages`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          jwt: localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          thread_id: id,
          sender: from,
          receiver: to,
          data: message
        })
      }).then(res => {
        res
          .json()
          .then(data => ({
            aNotification: data
          }))
          .then(res => {
            this.sendNotification(
              res.aNotification.receiver,
              res.aNotification.thread_id
            ); //Makes a POST request to the database to send new notification to a user with proper threadid
          });
      });
      this.props.updateOnReply();
    } else {
      alert("Enter a message !");
    }
  };

  sendNotification(email, threadId) {
    //sends notification
    fetch(`http://localhost:8000/notifications`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        jwt: localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        user_id: email,
        thread_id: threadId,
        tag_id: null
      })
    });
  }

  render() {
    return (
      <div>
        <div className="panel panel-default messager-editor">
          <div className="card-title">Reply to The Message</div>
          <div className="panel">
            <textarea
              className="form-control messager-editor-input"
              onChange={this.handleMessageEditorInputChange}
            />
            <button
              className="buttonmessage"
              onClick={() =>
                this.addMessage(
                  this.props.id,
                  this.props.sender,
                  this.props.receiver,
                  this.state.message
                )
              }
            >
              Reply
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Reply;
