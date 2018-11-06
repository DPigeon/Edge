import React, { Component } from "react";
import "./styles/notify.css";

class Notify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      notificationCounter: 0
    };
  }

  showPopupHandler = event => {
    event.preventDefault();
    this.setState({ showPopup: !this.state.showPopup });
  };

  showNotifications() {
    //To do later, just a quick preview was done.
  }

  render() {
    return (
      <span class="navbar-text float-xs-right ml-auto">
        <div class="dropdown">
          <button
            class="btn btn-primary dropdown-toggle"
            type="button"
            data-toggle="dropdown"
          >
            {this.state.notificationCounter}
            <span class="caret" />
          </button>
          <ul class="dropdown-menu">
            <li>
              <a href="/">Test1</a>
            </li>
            <li>
              <a href="/">Test2</a>
            </li>
            <li>
              <a href="/">Test3</a>
            </li>
          </ul>
        </div>
      </span>
    );
  }
}

export default Notify;
