import React, { Component } from "react";
import InputTrigger from "react-input-trigger";
import "./styles/post.css";

//Includes Mentions and the create post logic
class PostEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPostBody: "",
      selectedFile: null,
      left: null,
      top: null,
      mentionPost: "",
      selectUser: 0,
      position: null,
      hasMentions: false,
      showSuggestions: false,
      userTagged: ""
    };
    //Binders
    this.handleMention = this.handleMention.bind(this);
    this.toggleSuggestion = this.toggleSuggestion.bind(this);
  }

  fileChangedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  uploadHandler = () => {
    console.log(this.state.selectedFile);
    const formData = new FormData();
    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    //axios.post("my-domain.com/file-upload", formData);
    //const h = {};

    fetch("http://localhost:8000/images", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json" //profile_pic:true
        //cover_pic:true
        //post_id:true
      },
      body: formData
    })
      .then(response => {})
      .catch(err => {});
  };

  handlePostChange = event => {
    this.setState({
      newPostBody: event.target.value
    });
  };

  createPost = email => {
    if (this.state.newPostBody !== "") {
      //if the post is not empty
      //gets all posts
      this.props.addPost(this.state.newPostBody);
      this.setState({
        newPostBody: ""
      });
      fetch("http://localhost:8000/posts", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          jwt: localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          author_email: email,
          data: this.state.newPostBody
        })
      });
      //sends a tag notif if any tags in the post
      this.sendTagNotification(email, this.state.userTagged);
    }
  };

  //Begin of Mentions implementation

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
    const { position, newPostBody } = this.state;
    const user = users[id];
    var link = `<a href="/user/${user.email}">${user.firstname}${" "}${
      user.lastname
    }</a>`;
    //var link = `${user.firstname}${" "}${user.lastname}`;

    //const link2 = "This is <strong>not</strong> working.";
    //var link = {[<a href={"user/" + {user.email}}>{user.firstname}{user.lastname}</a>"]};

    const newText = `${newPostBody.slice(0, position + 1)}${link}`;
    this.setState({
      selectUser: 0,
      showSuggestions: false,
      left: null,
      top: null,
      mentionPost: null,
      position: null,
      newPostBody: newText,
      hasMentions: true,
      userTagged: user.email
    });
    this.endHandler();
  }

  doMentionActionsForKeyBoardEvents() {
    const { users } = this.props;
    const { selectUser, position, newPostBody } = this.state;
    const user = users[selectUser];
    var link = `<a href="/user/${user.email}">${user.firstname}${" "}${
      user.lastname
    }</a>`;
    //var link = `${user.firstname}${" "}${user.lastname}`;

    //const link2 = "This is <strong>not</strong> working.";
    //var link = {[<a href={"user/" + {user.email}}>{user.firstname}{user.lastname}</a>"]};

    const newText = `${newPostBody.slice(0, position + 1)}${link}`;
    this.setState({
      showSuggestions: false,
      left: null,
      top: null,
      mentionPost: null,
      position: null,
      newPostBody: newText,
      hasMentions: true,
      userTagged: user.email
    });
    this.endHandler();
  }

  sendTagNotification(taggedUser, userTagging) {
    //works but needs rework (look at comment below)
    if (this.state.hasMentions === true) {
      console.log(userTagging, taggedUser);
      //looks if the user tagged someone
      fetch(`http://localhost:8000/notifications`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          jwt: localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          user_id: userTagging,
          thread_id: 90, //thread ids cannot be undefined or null, must find a way to make this better
          tag_id: taggedUser
        })
      });
    }
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
          className="post"
          value={this.state.newPostBody}
          placeholder="Post something here.."
          onChange={this.handlePostChange}
        />
      </InputTrigger>
    );
  }

  //End of mention implementation

  render() {
    //Using some inline css here to keep the logic with javascript & css
    return (
      <div className="postEditor">
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
        <label className="ibtn">
          <input type="file" onChange={this.fileChangedHandler} />
          Upload Image
        </label>
        <button
          className="btnn"
          onClick={() => this.createPost(this.props.email)}
          type="button"
        >
          Post
        </button>
      </div>
    );
  }
}

export default PostEditor;
