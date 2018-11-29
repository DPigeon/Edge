import React, { Component } from "react";

class Mentions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      users: []
    };
  }

  handleMentions() {
    let atSubstring = "@";
    if (this.props.newPostBody.includes(atSubstring)) {
      //search for user to tag from the endpoint api of /users with GET method
      if (this.props.newPostBody.indexOf(atSubstring) === -1) {
        //search for the users
        fetch("http://localhost:8000/users")
          .then(res => res.json())
          .then(json => {
            this.setState({
              users: json
            });
          });
        let filteredSearch = this.state.users.filter(user => {
          return user.email.toLowerCase().indexOf(atSubstring) !== -1;
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
                      this.addThisMemberToTheGroup(item.firstname, item.id)
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
  }

  render() {
    return <div className="Mentions">{this.handleMentions()}</div>;
  }
}

export default Mentions;
