import React, { Component } from "react";

class GroupList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: "",
      groupDescritpion: "",
      groupList: [],
      groupTitle: "",
      groupAdmin: "",
      isLoaded: false
    };
  }

  componentDidMount() {
    let jwt = localStorage.getItem("jwt");
    if (jwt === undefined || jwt === null) {
      //if the user not logged in
      this.props.history.replace("/login"); //go login
    }
    fetch("http://localhost:3001/groups", {
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

  joinGroup() {} // Need to work on this.

  handleClickItem(gN, gD, gT) {
    this.setState({
      groupName: gN,
      groupDescritpion: gD,
      groupTitle: gT
    });
  }

  groupList() {
    var { isLoaded, groupList } = this.state;
    if (!isLoaded) {
      return <div> Loading the groups, please wait... </div>;
    } else {
      return (
        <div>
          <div>
            {groupList.map(item => (
              <div>
                <h10>
                  <div key={item.id}>
                    <ul>
                      <li>
                        <a href={"/groups/" + item.id}>
                          {item.name}
                          <br />
                          Group Title: {item.title}
                          <br />
                          Group Description: {item.description}
                        </a>
                        <button onclick={() => this.joinGroup()}>Join</button>
                      </li>
                    </ul>
                  </div>
                </h10>
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
