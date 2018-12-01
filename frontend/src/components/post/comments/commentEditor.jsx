import React, { Component } from "react";
import InputTrigger from "react-input-trigger";
import "./style/comment.css";

class CommentEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCommentBody: "",
      selectedFile: null,
      left: null,
      top: null,
      mentionPost: "",
      selectUser: 0,
      position: null,
      hasMentions: false,
      showSuggestions: false
    };
    this.handleMention = this.handleMention.bind(this);
    this.toggleSuggestion = this.toggleSuggestion.bind(this);
  }

  handleCommentChange = event => {
    this.setState({
      newCommentBody: event.target.value
    });
  };

  createComment = (email, postId) => {
    if (this.state.newCommentBody !== "") {
      this.props.addComment(this.state.newCommentBody);
      this.setState({
        newCommentBody: ""
      });
      fetch("http://localhost:8000/comments", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          jwt: localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          author_email: email,
          data: this.state.newCommentBody,
          post_id: postId
        })
      });
    }
  };

  toggleSuggestion(metaInformation) {
    const { hookType, cursor } = metaInformation; //this is how an entered string in a textarea is defined

    if (hookType === "start") {
      this.setState({
        showSuggestions: true,
        left: cursor.left,
        top: cursor.top + cursor.height, //no overlap for cursors
        position: cursor.selectionStart
      });
    }
    if (hookType === "cancel") {
      this.setState({
        showSuggestions: false,
        left: null,
        top: null,
        position: null
      });
    }
  }

  onMouseClick = id => {
    this.doMentionActionsForMouseEvents(id);
  };

  handleKeyPressed = event => {
    const { users } = this.props;
    const { selectUser } = this.state;
    if (event.key === "ArrowDown") {
      // the key down
      event.preventDefault();
      this.setState({
        selectUser: (selectUser + 1) % users.length
      });
    }
    if (event.key === "ArrowUp") {
      // the key up
      event.preventDefault();
      this.setState({
        selectUser: (selectUser - 1) % users.length
      });
    }
    if (event.key === "Enter") {
      // the enter key
      event.preventDefault();
      this.doMentionActionsForKeyBoardEvents();
    }
  };

  doMentionActionsForMouseEvents(id) {
    const { users } = this.props;
    const { position, newCommentBody } = this.state;
    const user = users[id];
    var link = `<a href="/user/${user.email}">${user.firstname}${" "}${
      user.lastname
    }</a>`;
    //var link = `${user.firstname}${" "}${user.lastname}`;

    //const link2 = "This is <strong>not</strong> working.";
    //var link = {[<a href={"user/" + {user.email}}>{user.firstname}{user.lastname}</a>"]};

    const newText = `${newCommentBody.slice(0, position + 1)}${link}`;
    this.setState({
      selectUser: 0,
      showSuggestions: false,
      left: null,
      top: null,
      mentionPost: null,
      position: null,
      newCommentBody: newText,
      hasMentions: true
    });
    //will send a notification passing user.email here
    this.endHandler();
  }

  doMentionActionsForKeyBoardEvents() {
    const { users } = this.props;
    const { selectUser, position, newCommentBody } = this.state;
    const user = users[selectUser];
    var link = `<a href="/user/${user.email}">${user.firstname}${" "}${
      user.lastname
    }</a>`;
    //var link = `${user.firstname}${" "}${user.lastname}`;

    //const link2 = "This is <strong>not</strong> working.";
    //var link = {[<a href={"user/" + {user.email}}>{user.firstname}{user.lastname}</a>"]};

    const newText = `${newCommentBody.slice(0, position + 1)}${link}`;
    this.setState({
      showSuggestions: false,
      left: null,
      top: null,
      mentionPost: null,
      position: null,
      newCommentBody: newText,
      hasMentions: true
    });
    //will send a notification passing user.email here with who tagged you (userProfile.email)
    this.endHandler();
  }

  handleMention(metaInformation) {
    this.setState({
      mentionPost: metaInformation.text
    });
  }

  showDropDown() {
    if (this.state.showSuggestions === true) {
      return (
        <div
          className=""
          style={{
            position: "absolute",
            width: 200,
            borderRadius: "6px",
            background: "white",
            boxShadow: "rgba(0, 0, 0, 0.4) 0px 1px 4px",
            display: this.state.showSuggestions ? "block" : "none",
            top: this.state.top,
            left: this.state.left
          }}
        >
          {this.props.users
            .filter(
              user =>
                user.firstname.toLowerCase().indexOf(this.state.mentionPost) !==
                  -1 ||
                user.lastname.toLowerCase().indexOf(this.state.mentionPost) !==
                  -1
            )
            .map((user, id) => (
              <div
                key={id}
                className="suggestions"
                style={{
                  cursor: "pointer",
                  background: id === this.state.selectUser ? "#eee" : ""
                }}
              >
                <a onClick={() => this.onMouseClick(id)}>
                  {user.firstname} {user.lastname}
                </a>
              </div>
            ))}
        </div>
      );
    }
  }

  inputTrigger() {
    return (
      <InputTrigger
        trigger={{ keyCode: 50, shiftKey: true }}
        onStart={metaData => {
          this.toggleSuggestion(metaData);
        }}
        onCancel={metaData => {
          this.toggleSuggestion(metaData);
        }}
        onType={metaData => {
          this.handleMention(metaData);
        }}
        endTrigger={endHandler => {
          this.endHandler = endHandler;
        }}
      >
        <textarea
          id="ppp"
          className="commentfield commentinput"
          value={this.state.newCommentBody}
          placeholder="Comment something here.."
          onChange={this.handleCommentChange}
        />
      </InputTrigger>
    );
  }

  render() {
    return (
      <div className="commentcontainer">
        <div className="mention" onKeyDown={this.handleKeyPressed}>
          {this.inputTrigger()}
          {this.showDropDown()}
          <div
            id="dropdown"
            className="showdrop"
            style={{
              position: "absolute",
              width: "200px",
              borderRadius: "6px",
              background: "white",
              boxShadow: "rgba(0, 0, 0, 0.4) 0px 1px 4px",
              display: this.state.showSuggestions ? "block" : "none",
              top: this.state.top,
              left: this.state.left
            }}
          />
        </div>
        <button
          className="commentbtn"
          onClick={() =>
            this.createComment(this.props.email, this.props.postId)
          }
        >
          Comment
        </button>
      </div>
    );
  }
}

export default CommentEditor;
