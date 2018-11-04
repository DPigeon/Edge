import React, { Component } from "react";

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
        <button className="btn btn-dark" onClick={() => this.showPopupHandler}>
          {this.state.notificationCounter}
        </button>
        {this.state.showPopup ? (
          <div className="menu">
            <button> New message from David</button>
            <br />
            <button> David posted on your wall </button>
            <br />
            <button> New message from Ruslan</button>
          </div>
        ) : null}
      </span>
    );
  }
}

export default Notify;
