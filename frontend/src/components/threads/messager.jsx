import React, { Component } from "react";
import Reply from "./reply";
import "./styles/messages.css";

class Messager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      items: [],
      from: "",
      isLoaded: false
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.id !== this.props.id) {
      this.setState({ id: newProps.id });
      fetch(`http://localhost:8000/threads/${newProps.id}/messages`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          jwt: localStorage.getItem("jwt")
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({
            isLoaded: true,
            items: json
          });
        });
    } else {
      fetch(`http://localhost:8000/threads/${this.state.id}/messages`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          jwt: localStorage.getItem("jwt")
        }
      })
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
              {items.map((item, id) => (
                <div className="cardmessage" key={id}>
                  <li key={item.id}>
                    <h5>
                      <div className="messagefrom">
                        Message from
                        <a href={"/user/" + item.sender}>{item.sender}</a>
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
              updateOnReply={() => this.props.updateOnReply()}
            />
          </div>
        </React.Fragment>
      );
    }
  }
}

export default Messager;
