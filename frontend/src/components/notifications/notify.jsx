import React, { Component } from "react";
import "./styles/notify.css";

class Notify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      notificationCounter: 3
    };
  }

  //

  showPopupHandler = event => {
    event.preventDefault();
    this.setState({ showPopup: !this.state.showPopup });
  };

  showNotifications() {
    //To do later, just a quick preview was done.
  }

  render() {
    //we can map an array of notifications coming from the backend so that we see all of them on hover
    //this is a simple notification example
    return (
      <span class="navbar-text float-xs-right ml-auto">
        <div class="dropdown">
          <button class="btn btn-success dropdown-toggle dropbtn">
            {this.state.notificationCounter}
          </button>
          <div class="dropdown-content">
            <a class="dropdown-item" href="/threads">
              Message from David
            </a>
            <a class="dropdown-item" href="/">
              New post from Ruslan
            </a>
            <a class="dropdown-item" href="/threads">
              Message from Maria
            </a>
          </div>
        </div>
      </span>
    );
  }
}

export default Notify;
