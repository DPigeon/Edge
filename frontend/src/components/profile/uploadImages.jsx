import React, { Component } from "react";

class UploadImages extends Component {
  state = {
    selectedFile: null
  };

  fileUploadHandler = () => {
    const formData = new FormData();
    formData.append(
      "image",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    fetch("http://localhost:3001/pictures", formData, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      onUploadProgress: progressEvent => {
        console.log(
          "Upload Progress:" +
            Math.round((progressEvent.loaded / progressEvent.total) * 100) +
            "%"
        );
      }
    }).then(res => {
      console.log(res);
    });
  };

  fileChangedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  render() {
    return (
      <React.Fragment>
        <input
          type="file"
          accept="image/*"
          onChange={this.fileChangedHandler}
        />
        <button onClick={this.fileUploadHandler}>Upload</button>
      </React.Fragment>
    );
  }
}

export default UploadImages;
