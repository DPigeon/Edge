import React, { Component } from "react";

class Messager extends Component {
  constructor(props) {
    super(props);
    //this.addMessage = this.addMessage.bind(this);
    //this.handleMessageEditorInputChange = this.handleMessageEditorInputChange.bind(this);
    this.state = {
      items: [],
      newMessageBody: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/messages")
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json
        });
      });
  }

  /*static handleMessageEditorInputChange = event => {
    this.setState({
      // newMessageBody: event.target.value
    });
  };*/

  //static addMessage = message => {
  /*const newState = Object.assign({}, this.state);
    newState.items.push(this.state.newMessageBody);
    newState.newMessageBody = "";
    this.setState(newState);*/
  /*fetch("http://localhost:3001/messages", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        msg: message,
        from: "David"
      })
    });
  };*/

  render() {
    var { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <div> Loading, please wait... </div>;
    } else {
      //Data has been loaded
      return (
        <div>
          <div className="navbar navbar-toggler badge-dark navbar-collapse">
            Inbox Messages
          </div>
          <ul>
            {items.map(item => (
              <div className="card messager-editor messager-body">
                <li key={item.id}>
                  <h3>
                    <div className="card-title">Message from {item.from}</div>
                  </h3>
                  <div className="card-block">{item.msg}</div>
                </li>
              </div>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default Messager;
