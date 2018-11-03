import React, { Component } from "react";
import Reply from "./reply";
import "./styles/messages.css";

class Messager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      from: "",
      isLoaded: false
    };
  }

  componentWillReceiveProps() {
    let id = this.props.id;
    if (id !== undefined) {
      fetch(`http://localhost:8000/threads/${id}/messages`)
        .then(res => res.json())
        .then(json => {
          this.setState({
            isLoaded: true,
            items: json
          });
        });
    }
  }

  componentDidMount() {
    let jwt = localStorage.getItem("jwt");
    if (jwt === undefined || jwt === null) {
      //if the user not logged in
      this.props.history.replace("/login"); //go login
    }
  }

  render() {
    var { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <div> Click on threads to view their conversation... </div>;
    } else {
      //Data has been loaded
      return (
        <React.Fragment>
          <div>
            <ul>
              <h4>{this.props.name} Conversation</h4>
              {items.map(item => (
                <div className="cardmessage">
                  <li key={item.id}>
                    <h5>
                      <div className="messagefrom">
                        Message from {item.sender}
                      </div>
                    </h5>
                    <div className="itemmsg">
                      <p className="mess">{item.data}</p>
                    </div>
                  </li>
                </div>
              ))}
            </ul>
            <Reply
              id={this.props.id}
              sender={this.props.sender}
              receiver={this.props.receiver}
            />
          </div>
        </React.Fragment>
      );
    }
  }
}

export default Messager;
