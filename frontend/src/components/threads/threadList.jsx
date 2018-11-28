import React, { Component } from "react";
import Messager from "./messager";
import decode from "jwt-decode";
import "./styles/messages.css";

class ThreadList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: [],
      threads: [],
      isLoaded: false,
      currentId: "",
      from: "",
      to: "",
      name: "",
      clickedThread: false,
      currentIdMessage: "",
      title: "",
      fromMsg: "",
      toMsg: "",
      msg1: "",
      aNotification: []
    };
  }

  componentDidMount() {
    let jwt = localStorage.getItem("jwt");
    let profile = decode(jwt); //decodes the jwt
    this.setState({
      userProfile: profile
    });
    if (jwt === undefined || jwt === null) {
      //if the user not logged in
      this.props.history.replace("/login"); //go login
    }
    fetch("http://localhost:8000/threads", {
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
          threads: json
        });
      });
  }

  handleClickItem = (id, sender, receiver, n) => {
    this.setState({
      currentId: id,
      from: sender,
      to: receiver,
      name: n,
      clickedThread: true
    });
  };

  showColumn2() {
    var { isLoaded, threads } = this.state;
    if (!isLoaded) {
      return <div> Loading the threads, please wait... </div>;
    } else {
      return (
        <div className="col2">
          {[...threads].reverse().map((item, id) => (
            <div className="" key={id}>
              <div className="" key={item.id}>
                <div
                  className="thread"
                  onClick={() =>
                    this.handleClickItem(
                      item.id,
                      item.sender,
                      item.receiver,
                      item.name
                    )
                  }
                >
                  {item.name}
                  <br />
                  Message from {item.sender}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }

  updateOnReply = messageId => {
    this.setState({
      currentId: messageId,
      clickedThread: true
    });
  };

  showMessagesOrNewMessageColumn() {
    var { currentId, to, name, clickedThread } = this.state;
    if (clickedThread) {
      return (
        <div className="col3">
          <Messager
            id={currentId}
            sender={this.state.userProfile.email}
            receiver={to}
            name={name}
            updateOnReply={() => this.updateOnReply(currentId)}
          />
        </div>
      );
    } else {
      return (
        <div className="col3">
          <ul className="rightsend" />
          <h1>Send a new message</h1>
          Message Title
          <br />
          <input value={this.state.title} onChange={this.handleTitleChange} />
          <br />
          <br />
          To:
          <br />
          <input value={this.state.toMsg} onChange={this.handleToChange} />
          <br />
          <br />
          Type in a message...
          <br />
          <input
            className="newMessage"
            value={this.state.msg1}
            onChange={this.handleMsgChange}
          />
          <br />
          <br />
          <button
            className=" btn-success"
            onClick={() =>
              this.createMessage(
                this.state.userProfile.email,
                this.state.toMsg,
                this.state.title,
                this.state.msg1
              )
            }
          >
            Send Message
          </button>
          <br />
        </div>
      );
    }
  }

  handleTitleChange = event => {
    this.setState({
      title: event.target.value
    });
  };

  handleToChange = event => {
    this.setState({ toMsg: event.target.value });
  };

  handleFromChange = event => {
    this.setState({ fromMsg: event.target.value });
  };

  handleMsgChange = event => {
    this.setState({ msg1: event.target.value });
  };

  createThread = id => {
    this.setState({
      currentIdMessage: id,
      /*from: sender,
      to: receiver,
      name: n,*/
      clickedThread: false
    });
  };

  createMessage = (from, receiver, name, msg) => {
    console.log(from, receiver, name, msg);
    if (msg !== "" && receiver !== "" && name !== "") {
      // if the fields are not empty, send message
      fetch(`http://localhost:8000/threads`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          jwt: localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          sender: from,
          receiver: receiver,
          name: name
        })
      }).then(res => {
        res
          .json()
          .then(data => ({
            aConversation: data
          }))
          .then(res => {
            this.createFirstMessageInConversation(
              res.aConversation.id,
              from,
              receiver,
              msg
            );
          });
      });
    } else {
      alert("Fields must not be empty !");
    }
  };

  createFirstMessageInConversation(threadId, from, receiver, msg) {
    //adds the first message to conversation
    fetch(`http://localhost:8000/messages`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        jwt: localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        thread_id: threadId,
        sender: from,
        receiver: receiver,
        data: msg
      })
    }).then(res => {
      res
        .json()
        .then(data => ({
          aNotification: data
        }))
        .then(res => {
          this.sendNotification(
            res.aNotification.receiver,
            res.aNotification.thread_id
          ); //Makes a POST request to the database to send new notification to a user with proper threadid
        });
    });
    alert("You just sent a new message to " + receiver + " !");
    //window.location.reload();
  }

  sendNotification(email, threadId) {
    //sends notification
    fetch(`http://localhost:8000/notifications`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        jwt: localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        user_id: email,
        thread_id: threadId
      })
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="containerbox">
          {this.showColumn2()}
          {this.showMessagesOrNewMessageColumn()}
        </div>
      </React.Fragment>
    );
  }
}

export default ThreadList;
