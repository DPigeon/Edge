import React, { Component } from "react";
import "./styles/messages.css";

class Reply extends Component {
  state = {
    to: "",
    message: ""
  };

  componentDidMount() {}

  handleMessageEditorInputChange = event => {
    this.setState({
      message: event.target.value
    });
  };

  addMessage = (id, from, to, message) => {
    fetch(`http://localhost:8000/threads/${id}/messages`, {
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
    window.location.reload(); //refreshes page
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
                  this.props.from,
                  this.props.to,
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
