import React, { Component } from "react";
import InputTrigger from "react-input-trigger";
import "./styles/post.css";

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
      users: [],
      showSuggestions: false
    };
    this.handleMention = this.handleMention.bind(this);
    this.toggleSuggestion = this.toggleSuggestion.bind(this);
  }

  componentDidMount() {
    //fetches all the users to show them on the suggestion
    fetch("http://localhost:8000/users", {
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
          users: json
        });
      });
  }

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

  handleKeyPressed = event => {
    const { selectUser, users } = this.state;
    //console.log(event.key);
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

      const { users, selectUser, position, newPostBody } = this.state;
      const user = users[selectUser];

      //const link2 = "This is <strong>not</strong> working.";
      //var link = {[<a href={"user/" + {user.email}}>{user.firstname}{user.lastname}</a>"]};

      const newText = `${newPostBody.slice(0, position + 1)}${
        user.firstname
      } ${""}${user.lastname}`;

      this.setState({
        showSuggestions: false,
        left: null,
        top: null,
        mentionPost: null,
        position: null,
        newPostBody: newText
      });
      this.endHandler();
    }
  };

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
    }
  };

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
          {this.state.users
            .filter(user => user.email.indexOf(this.state.mentionPost) !== -1)
            .map((user, id) => (
              <div
                key={id}
                className="suggestions"
                style={{
                  cursor: "pointer",
                  background: id === this.state.selectUser ? "#eee" : ""
                }}
              >
                <a href={"/user/" + user.email}>
                  {user.firstname} {user.lastname}
                </a>
              </div>
            ))}
        </div>
      );
    }
  }

  render() {
    return (
      <div className="postEditor">
        <div className="mention" onKeyDown={this.handleKeyPressed}>
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
