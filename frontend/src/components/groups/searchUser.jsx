import React, { Component } from "react";

class SearchUser extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      users: []
    };
  }

  componentDidMount() {
    //signup ---> user on 8000 (David's notes)
    fetch("http://localhost:3001/signup")
      .then(res => res.json())
      .then(json => {
        this.setState({
          users: json
        });
      });
  }

  getTeacher(isTeacher) {
    var teacherOrParent = "";
    if (!isTeacher) teacherOrParent = "Parent";
    else teacherOrParent = "Teacher";
    return teacherOrParent;
  }

  getList() {
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
                <h10>
                  <div className="isTeacher">
                    {this.getTeacher(item.isTeacher)}
                  </div>
                </h10>
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
            onKeyPress={this.getList()}
          />

          {this.getList()}
        </center>
      </div>
    );
  }
}

export default SearchUser;
