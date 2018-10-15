import React, { Component } from "react";

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

  refreshMessages = res => {
    this.setState({ message: res.data.message });
  };

  addMessage = message => {
    /*const newState = Object.assign({}, this.state);
    newState.items.push(this.state.newMessageBody);
    newState.newMessageBody = "";
    this.setState(newState);*/
    fetch("http://localhost:3001/messages", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "David",
        msg: message
      })
    });
  };

  render() {
    return (
      <div>
        <div className="panel panel-default messager-editor">
          <div className="card-title">Quick Reply to The Message</div>
          <div className="panel">
            <textarea
              className="form-control messager-editor-input"
              onChange={this.handleMessageEditorInputChange}
            />
            <button
              className="btn btn-success messager-editor-button"
              onClick={() => this.addMessage(this.state.message)}
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
