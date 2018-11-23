import React, { Component } from "react";
import decode from "jwt-decode";
import SearchGroup from "./searchGroup";
import Popup from "reactjs-popup";
import CreateGroup from "./createGroup";

class GroupList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: "",
      groupDescritpion: "",
      groupList: [],
      groupTitle: "",
      groupAdmin: "",
      userProfile: [],
      members: [],
      newMembers: [],
      isLoaded: false
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
    fetch("http://localhost:8000/groups", {
      method: "GET"
    })
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          groupList: json
        });
      });
  }

  memberAlreadyExistsInGroup(membersArray, email) {
    for (var i = 0; i < membersArray.length; i++) {
      if (email === membersArray[i].user_id) return true; //does not exist
    }
    return false; //exists
  }

  joinGroup = (id, email, name) => {
    //make it so if user already exists in the group, alert(You cannot join cause you are already inside this group)
    fetch(`http://localhost:8000/groups/${id}/members`) //gets all the members inside the group
      .then(res => res.json())
      .then(json => {
        this.setState({
          members: json
        });
        this.beforeRequest(this.state.members, email, id, name); //We did not have access to the members (fixed David)
      });
  };

  //console.log(newMembersArray); //BUG: the array is empty on first click of join button
  beforeRequest(members, email, id, name) {
    if (this.memberAlreadyExistsInGroup(members, email) === false) {
      //sees if member already exists
      this.sendGroupRequest(email, id); //send a group request to the database
      alert("You have sent a request to join " + name + "'s group !");
    } else {
      //if the email is the same as one of the emails in the group members list
      alert("You are already a member of this group !");
    }
  }

  sendGroupRequest(email, id) {
    fetch(`http://localhost:8000/groups/${id}/requests`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: email
      })
    });
  }

  handleClickItem(gN, gD, gT) {
    this.setState({
      groupName: gN,
      groupDescritpion: gD,
      groupTitle: gT
    });
  }

  groupList() {
    const modalStyle = {
      width: "500px",
      backgroundColor: "rgba(255, 255, 255, .9)"
    };
    //decodes the jwt
    var { isLoaded, groupList } = this.state;
    if (!isLoaded) {
      return <div> Loading the groups, please wait... </div>;
    } else {
      return (
        <div>
          <center>
            <br />
            <br />
            <Popup
              contentStyle={modalStyle}
              trigger={
                <button className="creategrp">
                  <img
                    src={require("./styles/add.png")}
                    alt="add group"
                    className="addgrp"
                  />
                </button>
              }
              modal
              closeOnDocumentClick
            >
              <CreateGroup />
            </Popup>

            <Popup
              contentStyle={modalStyle}
              trigger={
                <button className="creategrp">
                  <img
                    src={require("./styles/search.png")}
                    alt="search group"
                    className="addgrp"
                  />
                </button>
              }
              modal
              closeOnDocumentClick
            >
              <SearchGroup />
            </Popup>
            <Popup
              contentStyle={modalStyle}
              trigger={
                <button className="creategrp">
                  <img
                    src={require("./styles/list.png")}
                    alt="search group"
                    className="addgrp"
                  />
                </button>
              }
              modal
              closeOnDocumentClick
            >
              <div>
                <center>
                  {groupList.map(item => (
                    <div key={item.id}>
                      <ul>
                        <li>
                          <a href={"/group/" + item.id}>
                            Group Name: {item.name}
                            <br />
                          </a>
                          <button
                            className="btn-success"
                            onClick={() =>
                              this.joinGroup(
                                item.id,
                                this.state.userProfile.email,
                                item.name
                              )
                            }
                          >
                            Join Group
                          </button>
                        </li>
                      </ul>
                    </div>
                  ))}
                </center>
              </div>
            </Popup>
          </center>
        </div>
      );
    }
  }

  render() {
    return (
      //should separate each group to different buttons
      <React.Fragment>
        <div className="groupList">{this.groupList()}</div>
      </React.Fragment>
    );
  }
}

export default GroupList;
