import React, { Component } from "react";

class IndividualGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      groupInfo: [],
      id: ""
      /*groups: [
        {
          // ignore these.
          id: 0,
          title: "Member0",
          selected: false,
          key: "groupMember"
        },

        {
          id: 1,
          title: "Member1",
          selected: false,
          key: "groupMember"
        },
        {
          id: 2,
          title: "Member2",
          selected: false,
          key: "groupMember"
        },
        {
          id: 3,
          title: "Member3",
          selected: false,
          key: "groupMember"
        },
        {
          id: 4,
          title: "Member4",
          selected: false,
          key: "groupMember"
        },
        {
          id: 5,
          title: "Member5",
          selected: false,
          key: "groupMember"
        }
      ]*/
    };
  }

  componentDidMount() {
    const { group_id } = this.props.match.params; //gets the id from the url
    this.setState({
      id: group_id
    });
    fetch(`http://localhost:8000/groups/${group_id}/members`) //from data.json file
      .then(res => res.json())
      .then(json => {
        this.setState({
          members: json
        });
      });
    fetch(`http://localhost:8000/groups/${group_id}`) //from data.json file
      .then(res => res.json())
      .then(json => {
        this.setState({
          groupInfo: json
        });
      });
  }

  isGroupAdmin(admin) {
    //looks if admin or not with text
    var adminOrMember = "";
    if (admin === 0) adminOrMember = "Member";
    else adminOrMember = "Admin";
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
        <div className="GroupInfo">
          <ul>
            {this.state.groupInfo.map(item => (
              <div className="Group">
                <li key={item.id}>
                  <h5>
                    <div className="GroupAdmin">Group Name {item.name}</div>
                  </h5>
                  <div className="itemMember">
                    {this.showUrlMembers(item.members)}
                  </div>
                </li>
              </div>
            ))}
          </ul>
        </div>
        <div className="GroupMembers">
          <ul>
            {this.state.members.map(item => (
              <div className="Group">
                <li key={item.group_id}>
                  <h5>
                    <div className="GroupAdmin">
                      Group Admin: {this.isGroupAdmin(item.admin)}
                    </div>
                  </h5>
                  <div className="itemMember">
                    Member: {this.showUrlMembers(item.user_id)}
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
