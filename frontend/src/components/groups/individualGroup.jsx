import React, { Component } from "react";
import SearchUser from "./searchUser";

class IndividualGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      groupInfo: [],
      groupId: ""
    };
  }

  componentDidMount() {
    const { group_id } = this.props.match.params; //gets the id from the url
    this.setState({
      groupId: group_id
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
      });
  }

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
        <div className="GroupMembers">
          <ul>
            {this.state.members.map(item2 => (
              <div className="Group">
                <li key={item2.group_id}>
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
