import React, { Component } from "react";

class CreateGroup extends Component {
  state = {
    title: "",
    description: "",
    members: ""
  };

  //Will make it so when you click on input to add members, the user search opens up and when you click on a user, you pass his id/name to the new group
  //Must get the id or name of the current person creating the group to make it GROUP ADMIN

  handleTitleChange = event => {
    this.setState({
      title: event.target.value
    });
  };

  handleDescriptionChange = event => {
    this.setState({ description: event.target.value });
  };

  handleMembersChange = event => {
    this.setState({ members: event.target.value });
  };

  createNewGroup = (groupAdmin, title, description, members) => {
    fetch("http://localhost:3001/groups", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        description: description,
        groupAdmin: groupAdmin,
        members: members
      })
    });
  };

  render() {
    return (
      <div className="createGroup">
        <h1>Fill in the form to create a new group</h1>

        <input
          placeHolder="Title"
          value={this.state.title}
          onChange={this.handleTitleChange}
        />
        <br />
        <br />
        <input
          placeHolder="Group Description"
          value={this.state.description}
          onChange={this.handleDescriptionChange}
        />
        <br />
        <br />
        <input
          placeHolder="Search User"
          value={this.state.members}
          onChange={this.handleMembersChange}
        />
        <br />
        <br />

        <button
          onClick={() =>
            this.createNewGroup(
              1,
              this.state.title,
              this.state.description,
              this.state.members
            )
          }
        >
          Create
        </button>
      </div>
    );
  }
}

export default CreateGroup;
