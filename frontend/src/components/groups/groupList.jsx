import React, { Component } from "react";
import decode from "jwt-decode";

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

  joinGroup = (id, email) => {
    //make it so if user already exists in the group, alert(You cannot join cause you are already inside this group)
    fetch(`http://localhost:8000/groups/${id}/members`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: email,
        group_id: id,
        admin: 0
      })
    });
    //give access to the group afterwards
    window.location.replace("/groups/" + id);
  };

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
          <div>
            {groupList.map(item => (
              <div key={item.id}>
                <ul>
                  <li>
                    <a href={"/groups/" + item.id}>
                      Group Name: {item.name}
                      <br />
                    </a>
                    <button
                      onClick={() =>
                        this.joinGroup(item.id, this.state.userProfile.email)
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
