import React, { Component } from "react";

class SearchUser extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      users: [],
      groups: [],
      members: []
    };
  }

  componentDidMount() {
    //signup ---> user on 8000 (David's notes)
    fetch("http://localhost:8000/users", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        jwt: localStorage.getItem("jwt")
      }
    }) //gets all the user into an array to use
      .then(res => res.json())
      .then(json => {
        this.setState({
          users: json
        });
      });
    fetch("http://localhost:8000/groups", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        jwt: localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then(json => {
        this.setState({
          groups: json
        });
      });
  }

  getTeacher(isTeacher) {
    var teacherOrParent = "";
    if (!isTeacher) teacherOrParent = "Parent";
    else teacherOrParent = "Teacher";
    return teacherOrParent;
  }

  isInTheGroup(name) {
    //returns a boolean to know if the person is in the group
    for (var i = 0; i < this.state.groups.length; i++) {
      for (var j = i; i < this.state.groups.firstname; j++) {
        if (this.state.groups.firstname[j] === name) {
          return true;
        }
      }
    }
    return false;
  }

  addThisMemberToTheGroup = (id, email, name) => {
    fetch(`http://localhost:8000/groups/${id}/members`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        jwt: localStorage.getItem("jwt")
      }
    }) //gets all the members inside the group
      .then(res => res.json())
      .then(json => {
        this.setState({
          members: json
        });
        this.addMember(this.state.members, email, id, name); //We did not have access to the members (fixed David)
      });
  };

  memberAlreadyExistsInGroup(membersArray, email) {
    for (var i = 0; i < membersArray.length; i++) {
      if (email === membersArray[i].user_id) return true; //does not exist
    }
    return false; //exists
  }

  addMember(members, email, id, name) {
    if (this.memberAlreadyExistsInGroup(members, email) === false) {
      //to do (add the member to the new group on the backend)
    }
  }

  getList() {
    //search by first name
    if (this.state.search !== "") {
      let filteredSearch = this.state.users.filter(user => {
        //if you cannot find this search within it, do not return it
        return user.firstname.toLowerCase().indexOf(this.state.search) !== -1;
      });

      return (
        <ul>
          {filteredSearch.map(item => (
            <div className="cardmessage">
              <li key={item.id}>
                <h5>
                  <div className="firstlastname">
                    <a href={"/user/" + item.email}>
                      {item.firstname} {item.lastname}
                    </a>
                  </div>
                </h5>
                <div className="isTeacher">
                  {this.getTeacher(item.isTeacher)}
                </div>
                <button
                  className="btn btn-success"
                  onClick={() =>
                    this.addThisMemberToTheGroup(this.props.id, item.email)
                  }
                >
                  Add Member
                </button>
              </li>
            </div>
          ))}
        </ul>
      );
    }
  }

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  render() {
    return (
      <div>
        <center>
          <h4>User Search</h4>
          <input
            type="text"
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
          />

          {this.getList()}
        </center>
      </div>
    );
  }
}

export default SearchUser;
