import React, { Component } from "react";

class Reply extends Component {
  state = {
    to: "",
    message: ""
  };

  componentDidMount() {
    //Where we call our requests
    /*fetch('<your-heroku-url-goes-here>')
    .then(results => {
        return results.json();*/
  }

  render() {
    return (
      <div>
        <div className="panel panel-default fixed-bottom messager-editor">
          <div className="card-title">Quick Reply to The Message</div>
          <div className="panel">
            <textarea className="form-control messager-editor-input" />
            <button className="btn btn-success messager-editor-button">
              Reply
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Reply;
