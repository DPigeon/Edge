import React, { Component } from "react";
import decode from "jwt-decode";
import "./styles/groups.css";
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

  createNewGroup = (title, user, description) => {
    //makes a new group
    fetch("http://localhost:8000/groups", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        jwt: localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        name: title,
        description: description
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
        "Content-Type": "application/json",
        jwt: localStorage.getItem("jwt")
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
          <h5>Fill in the form to create a new group</h5>
          <br />
          <h6>Group Name:</h6>
          <input
            className="grpn"
            placeHolder="Groupe Name"
            value={this.state.title}
            onChange={this.handleTitleChange}
          />
          <br />
          <br />
          <h6>Group Description:</h6>
          <input
            className="grpd"
            placeHolder="Group Description"
            value={this.state.description}
            onChange={this.handleDescriptionChange}
          />
          <br />
          <br />
          <h6>You can add members later on !</h6>
          <br />
          <button
            className="grpbtn"
            onClick={() =>
              this.createNewGroup(
                this.state.title,
                this.state.userProfile.email,
                this.state.description
              )
            }
          >
            Create a New Group
          </button>
        </center>
      </div>
    );
  }
}

export default CreateGroup;
