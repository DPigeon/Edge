import React, { Component } from "react";
import PostDisplay from "../post/postDisplay";
import Home from "../Home";

class IndividualGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
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

  // Made by Maria and David looping the members and adding the link
  showUrlMembers(arrayMembers) {
    var membersObject = [];
    for (var i = 0; i < arrayMembers.length; i++) {
      membersObject.push(
        <a href={`/users/` + arrayMembers[i]}>{arrayMembers[i]}</a>
      );
    }
    return membersObject;
  }

  componentDidMount() {
    fetch("http://localhost:3001/groups") //from data.json file
      .then(res => res.json())
      .then(json => {
        this.setState({
          items: json
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        <ul>
          {this.state.items.map(item => (
            <div className="Group">
              <li key={item.id}>
                <h5>
                  <div className="GroupAdmin">
                    Group Leader {item.groupAdmin}
                  </div>
                </h5>
                <div className="itemMember">
                  {this.showUrlMembers(item.members)}
                </div>
              </li>
            </div>
          ))}
        </ul>
        <PostDisplay />
      </React.Fragment>
    );
  }
}

export default IndividualGroup;
