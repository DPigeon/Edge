import React, { Component } from "react";

class SearchUser extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      users: [],
      groups: [],
      members: [],
      aRequest: []
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
    if (isTeacher === 0) teacherOrParent = "Parent";
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

  addThisMemberToTheGroup = (id, email) => {
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
        this.addMember(this.state.members, email, id);
      });
  };

  memberAlreadyExistsInGroup(membersArray, email) {
    for (var i = 0; i < membersArray.length; i++) {
      if (email === membersArray[i].user_id) return true; //does not exist
    }
    return false; //exists
  }

  addMember(members, email, id) {
    //create a request
    fetch(`http://localhost:8000/groups/${id}/requests`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        jwt: localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        user_id: email
      })
    }).then(res => {
      res
        .json()
        .then(data => ({
          aRequest: data
        }))
        .then(res => {
          this.acceptRequestToAddMember(res.aRequest.id, true);
        });
    });
    //window.location.reload();
  }

  acceptRequestToAddMember(requestId, response) {
    //accepts the request and deletes it (automaticly adds the members in the group from the backend)
    fetch(`http://localhost:8000/groupRequests/${requestId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        jwt: localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        accept: response
      })
    });
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
                  {this.getTeacher(item.is_teacher)}
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
