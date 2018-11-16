import React, { Component } from "react";
import decode from "jwt-decode";

class CreateGroup extends Component {
  state = {
    aGroup: [],
    groups: [],
    userProfile: [],
    title: "",
    description: "",
    members: ""
  };

  componentDidMount() {
    let jwt = localStorage.getItem("jwt");
    let profile = decode(jwt); //decodes the jwt
    this.setState({
      userProfile: profile
    });
  }

  //Will make it so when you click on input to add members, the user search opens up and when you click on a user, you pass his id/name to the new group

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

  createNewGroup = (title, user) => {
    //makes a new group
    fetch("http://localhost:8000/groups", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: title
      })
    }).then(res => {
      res
        .json()
        .then(data => ({
          aGroup: data
        }))
        .then(res => {
          this.createAdminGroup(res.aGroup.id, user);
        });
    });
  };

  createAdminGroup(id, user) {
    //adds the admin group to database
    fetch(`http://localhost:8000/groups/${id}/members`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: user,
        admin: true
      })
    });
    alert("You just created a new group !");
    window.location.replace("/groups");
  }

  render() {
    return (
      <div className="createGroup">
        <center>
          <h1>Fill in the form to create a new group</h1>

          <input
            className="btn alert-success"
            placeHolder="Title"
            value={this.state.title}
            onChange={this.handleTitleChange}
          />
          <br />
          <br />
          <input
            className="btn alert-success"
            placeHolder="Group Description"
            value={this.state.description}
            onChange={this.handleDescriptionChange}
          />
          <br />
          <br />
          <p>You can add members later on !</p>
          <br />
          <button
            className="btn btn-success"
            onClick={() =>
              this.createNewGroup(
                this.state.title,
                this.state.userProfile.email
              )
            }
          >
            Create
          </button>
        </center>
      </div>
    );
  }
}

export default CreateGroup;
