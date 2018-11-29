import React, { Component } from "react";
import "./styles/post.css";

class PostEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPostBody: "",
      selectedFile: null
    };
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
    const h = {};

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

  render() {
    return (
      <div className="postEditor">
        <form id="ex" className="example">
          <input
            id="ppp"
            className="post"
            value={this.state.newPostBody}
            placeholder="Post something here.."
            onChange={this.handlePostChange}
          />
          <label className="ibtn">
            <input type="file" onChange={this.fileChangedHandler} />
            Upload Image
          </label>
          <button
            className="btnn"
            onClick={this.uploadHandler}
            onClick={() => this.createPost(this.props.email)}
            type="button"
          >
            Post
          </button>
        </form>
      </div>
    );
  }
}

export default PostEditor;
