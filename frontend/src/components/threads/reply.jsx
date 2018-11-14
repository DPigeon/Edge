import React, { Component } from "react";
import "./styles/messages.css";
import Notify from "../notifications/notify";

class Reply extends Component {
  constructor(props) {
    super(props);
    this.notify = new Notify();
    this.state = {
      to: "",
      message: ""
    };
  }

  componentDidMount() {}

  handleMessageEditorInputChange = event => {
    this.setState({
      message: event.target.value
    });
  };

  addMessage = (id, from, to, message) => {
    fetch(`http://localhost:8000/messages`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        thread_id: id,
        sender: from,
        receiver: to,
        data: message
      })
    });
    window.location.reload();
    //send the notification to receiver here
    this.notify.showNotifications(1, this.props.sender); //must fine who to send it to.
  };

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
