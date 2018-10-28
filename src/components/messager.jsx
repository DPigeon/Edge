import React, { Component } from "react";
import Reply from "./reply";
import AuthService from "./login/authService";
import "./css/messages.css";

const Auth = new AuthService("http://localhost:3001");

class Messager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      from: "",
      newMessageBody: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    if (!Auth.loggedIn()) {
      //if the user not logged in
      this.props.history.replace("/login"); //go login
    }
    fetch("http://localhost:3001/messages")
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json
        });
      });
  }

  render() {
    var { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <div> Loading, please wait... </div>;
    } else {
      //Data has been loaded
      return (
        <React.Fragment>
          <div>
            <ul>
              {items.map(item => (
                <div className="cardmessage">
                  <li key={item.id}>
                    <h5>
                      <div className="messagefrom">
                        Message from {item.from}
                      </div>
                    </h5>
                    <div className="itemmsg">
                      <p className="mess">{item.msg}</p>
                    </div>
                  </li>
                </div>
              ))}
            </ul>
            <Reply />
          </div>
        </React.Fragment>
      );
    }
  }
}

export default Messager;
