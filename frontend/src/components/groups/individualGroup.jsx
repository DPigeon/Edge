import React, { Component } from "react";
import decode from "jwt-decode";
import SearchUser from "./searchUser";

//The notification group request are going to be implemented in this page
//Also, make it so only members and admin of the group have access to this page
class IndividualGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: [],
      members: [],
      groupInfo: [],
      requests: [],
      groupId: ""
    };
  }

  componentDidMount() {
    const { group_id } = this.props.match.params; //gets the id from the url
    this.setState({
      groupId: group_id
    });
    let jwt = localStorage.getItem("jwt");
    let profile = decode(jwt); //decodes the jwt
    this.setState({
      userProfile: profile
    });
    //Must get the users for profile id of each email
    /*fetch(
      `http://localhost:8000/users`
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          users: json
        });
      });
  }*/
    fetch(
      `http://localhost:8000/groups/${this.props.match.params.groupId}/members`
    )
      .then(res => res.json())
      .then(json => {
        this.setState({
          members: json
        });
        if (
          this.canViewThePage(
            this.state.members,
            this.state.userProfile.email
          ) === false
        ) {
          alert("You must be a member of this group to access it.");
          this.props.history.replace("/groups"); //go home
        }
      });
  }

  canViewThePage(memberArray, email) {
    for (var i = 0; i < memberArray.length; i++) {
      if (email === memberArray[i].user_id) {
        return true; // he/she has access to the page
      }
    }
    return false; //not in the list so no access to the group
  }

  isTheCurrentUserAnAdmin(email, isAdmin) {
    for (var i = 0; i < this.state.members.length; i++) {
      if (
        email === this.state.members[i].user_id &&
        isAdmin === this.state.members[i].admin
      ) {
        return true; // he/she is an admin
      }
    }
    return false;
  }

  notificationRequests(email, isAdmin) {
    if (this.isTheCurrentUserAnAdmin(email, isAdmin) === true) {
      //with the jwt token, we look if the person looking at the page is in hierarchy
      fetch(
        `http://localhost:8000/groups/${
          this.props.match.params.groupId
        }/requests`,
        {
          method: "GET"
        }
      )
        .then(res => res.json())
        .then(json => {
          this.setState({
            requests: json
          });
        });
      return (
        <div>
          <h2>Group Requests</h2>
          {this.state.requests.map(item => (
            <div key={item.id}>
              <ul>
                <li>
                  {item.user_id} wants to join this group
                  <br />
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      this.acceptRejectRequest(item.id, item.user_id, true)
                    }
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      this.acceptRejectRequest(item.id, item.user_id, false)
                    }
                  >
                    Reject
                  </button>
                </li>
              </ul>
            </div>
          ))}
        </div>
      );
    } else {
      return <div />; //if not admin of the group, don't show anything david
    }
  }

  acceptRejectRequest = (requestId, userId, response) => {
    //accepted member, congratulations {name}!
    fetch(`http://localhost:8000/groupRequests/${requestId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        accept: response
      })
    });
    if (response === true)
      alert("You have accepted " + userId + "'s request !");
    else alert("You have rejected " + userId + "'s request !");
    window.location.reload();
  };

  isGroupAdmin(admin) {
    //looks if admin or not with text
    var adminOrMember = "";
    if (admin === false) adminOrMember = "Member";
    else if (admin === true) adminOrMember = "Admin";
    return adminOrMember;
  }

  // Made by Maria and David looping through members and adding the link
  showUrlMembers(arrayMembers) {
    var membersObject = [];
    for (var i = 0; i < arrayMembers.length; i++) {
      membersObject.push(
        <a href={`/users/` + arrayMembers[i]}>{arrayMembers[i]}</a>
      );
    }
    return membersObject;
  }

  render() {
    return (
      <React.Fragment>
        <div className="GroupRequests">
          {this.notificationRequests(this.state.userProfile.email, true)}
        </div>
        <div className="GroupMembers">
          <h2>Members of the group:</h2>
          <ul>
            {this.state.members.map(item2 => (
              <div className="Group">
                <li key={item2.id}>
                  <div className="itemMember">
                    {this.isGroupAdmin(item2.admin)}
                    <h5>
                      <a href={`/users/` + item2.group_id}>{item2.user_id}</a>
                    </h5>
                  </div>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default IndividualGroup;
