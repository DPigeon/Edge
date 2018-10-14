import React, { Component } from "react";

class Messager extends Component {
  /*state = {
    from: "Andrew",
    message:
      "Hey, how are you ? I wanted to know if I could borrow your calculator for the midterm tomorrow. Thank you ! Now, let me test your message output: ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc"
  };*/

  constructor(props) {
    super(props);

    this.state = {
      from: "Andrew",
      messages: ["Hello World!"],
      message:
        "Hey, how are you ? I wanted to know if I could borrow your calculator for the midterm tomorrow. Thank you ! Now, let me test your message output: ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc"
    };
  }

  componentDidMount() {
    //Where we call our requests
    /*fetch('<your-heroku-url-goes-here>')
    .then(results => {
        return results.json();*/
  }

  render() {
    return (
      <div>
        <div className="navbar navbar-toggler badge-dark navbar-collapse">
          Inbox Messages
        </div>
        <div className="card messager-editor messager-body">
          <h3>
            <div className="card-title">Message from {this.state.from}</div>
          </h3>
          <div className="card-block">{this.state.message}</div>
        </div>
      </div>
    );
  }
}

export default Messager;
