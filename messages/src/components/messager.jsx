import React, { Component } from "react";

class Messager extends Component {
  state = {
    to: "",
    from: "Andrew",
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
        <div className="panel panel-default messager-editor">
          <div className="card-title">Message from {this.state.from}</div>
          <div className="panel" />
        </div>
      </div>
    );
  }
}

export default Messager;
