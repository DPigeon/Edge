import React, { Component } from "react";
import Messager from "./messager";
import "./styles/messages.css";

class ThreadList extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    if (jwt === undefined || jwt === null) {
      //if the user not logged in
      this.props.history.replace("/login"); //go login
    }
    fetch("http://localhost:8000/threads", {
      method: "GET"
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

  showColumn1() {
    return (
      <div className="col1">
        <ul className="leftopt">
          <li>
            <button className=" btn-dark" onClick={() => this.createThread()}>
              Compose
            </button>
          </li>
          <br />
          <li>
            <button className=" btn-dark" href="/">
              Inbox ({this.state.threads.length})
            </button>
          </li>

          <br />
          <li>
            <button className=" btn-dark" href="/">
              Sent
            </button>
          </li>
          <br />
          <li>
            <button className=" btn-dark" href="/">
              Contacts (0)
            </button>
          </li>
          <br />
        </ul>
      </div>
    );
  }

  showColumn2() {
    var { isLoaded, threads } = this.state;
    if (!isLoaded) {
      return <div> Loading the threads, please wait... </div>;
    } else {
      return (
        <div className="col2">
          <div className="ThreadList">
            {threads.map(item => (
              <div className="containermessage">
                <h10>
                  <div className="boxmessage" key={item.id}>
                    <ul>
                      <li>
                        <button
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
                          <br />
                          03/06/18
                        </button>
                      </li>
                    </ul>
                  </div>
                </h10>
              </div>
            ))}
            <center>
              <button
                className=" btn-success"
                onClick={() => this.createThread(this.state.id)}
              >
                New Message
              </button>
            </center>
          </div>
        </div>
      );
    }
  }

  showMessagesOrNewMessageColumn() {
    var { currentId, from, to, name, clickedThread } = this.state;
    if (this.state.clickedThread) {
      return (
        <div className="col3">
          <ul className="rightsend">
            <li>
              <a href="/">Send</a>
            </li>
          </ul>
          <Messager id={currentId} sender={from} receiver={to} name={name} />
        </div>
      );
    } else {
      return (
        <div className="col3">
          <ul className="rightsend" />
          <h1>Send a new message</h1>

          <input
            placeHolder="Title"
            value={this.state.title}
            onChange={this.handleTitleChange}
          />
          <br />
          <br />
          <input
            placeHolder="From"
            value={this.state.fromMsg}
            onChange={this.handleFromChange}
          />
          <br />
          <br />
          <input
            placeHolder="To"
            value={this.state.toMsg}
            onChange={this.handleToChange}
          />
          <br />
          <br />
          <input
            placeHolder="Message"
            value={this.state.msg1}
            onChange={this.handleMsgChange}
          />
          <br />
          <br />
          <button
            className=" btn-success"
            onClick={() =>
              this.createMessage(
                this.state.fromMsg,
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
    fetch(`http://localhost:8000/threads`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
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

    //AFTER, CREATE A NEW REQUEST TO ADD THE FIRST MESSAGE IN CONVERSATION MESSAGE BETWEEN THE 2 USERS
  };

  createFirstMessageInConversation(threadId, from, receiver, msg) {
    //adds the first message to conversation
    fetch(`http://localhost:8000/messages`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
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
    window.location.reload();
  }

  sendNotification(email, threadId) {
    //sends notification
    fetch(`http://localhost:8000/notifications`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
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
          {this.showColumn1()}
          {this.showColumn2()}
          {this.showMessagesOrNewMessageColumn()}
        </div>
      </React.Fragment>
    );
  }
}

export default ThreadList;
