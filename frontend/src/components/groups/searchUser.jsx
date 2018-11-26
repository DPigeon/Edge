import React, { Component } from "react";

class SearchUser extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      users: [],
      groups: []
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

  addThisMemberToTheGroup = (name, id) => {
    //add the name by id and retreive them ?

    //var obj2 = JSON.parse(this.state.groups);
    var { objectGroup } = "";
    /*for (var i = 0; i < this.state.groups.length; i++) {
      objectGroup[i] = this.state.groups;
    }*/
    objectGroup = JSON.parse(this.state.groups);
    console.log(objectGroup);
    //var objectInJSON = JSON.parse(objectGroup);
    objectGroup[id - 1].members.push(name);
    console.log(objectGroup);
    //this adds the member to the group if not in the group
    //if (!this.isInTheGroup(name))
    //ERROR: I CANNOT ACCESS THE SPECIFIC GROUP MEMBERS AND ADD NEW MEMBER TO IT
    /*fetch("http://localhost:3001/groups/" + id, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(objectGroup)
    });
    alert(name + " has been added to the group !");*/
  };

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
                    this.addThisMemberToTheGroup(item.email, item.id)
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
