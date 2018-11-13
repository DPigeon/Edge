import React, { Component } from "react";
import decode from "jwt-decode";
import SearchGroup from "./searchGroup";

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

  memberAlreadyExistsInGroup(email) {
    for (var i = 0; i < this.state.members.length; i++) {
      if (email === this.state.members[i].user_id) return true; //does not exist
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
      });
    console.log(this.state.members); //BUG: the array is empty on first click of join button
    if (this.memberAlreadyExistsInGroup(email) === false) {
      //sees if member already exists
      fetch(`http://localhost:8000/groups/${id}/members`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: email,
          admin: false
        })
      });
      //give access to the group afterwards
      //this.sendGroupRequest(email, id); //send a group request to the database
      alert("You have joined " + name + "'s group !");
      //window.location.replace("/group/" + id);
    } else {
      //if the email is the same as one of the emails in the group members list
      alert("You are already a member of this group !");
    }
  };

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
    //decodes the jwt
    var { isLoaded, groupList } = this.state;
    if (!isLoaded) {
      return <div> Loading the groups, please wait... </div>;
    } else {
      return (
        <div>
          <SearchGroup />
          <div>
            {groupList.map(item => (
              <div key={item.id}>
                <ul>
                  <li>
                    <a href={"/group/" + item.id}>
                      Group Name: {item.name}
                      <br />
                    </a>
                    <button
                      onClick={() =>
                        this.joinGroup(
                          item.id,
                          this.state.userProfile.email,
                          item.name
                        )
                      }
                    >
                      Join
                    </button>
                  </li>
                </ul>
              </div>
            ))}
            <center>
              <a href={"/creategroup"}>
                <button className="newGroup">Create Group</button>
              </a>
            </center>
          </div>
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
