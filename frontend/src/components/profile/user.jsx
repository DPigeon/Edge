import React, { Component } from "react";

class User extends Component {
  //fetches any users from database
  state = {
    email: "",
    user: []
  };

  componentDidMount() {
    const { emailName } = this.props.match.params; //gets the username from the url
    this.setState({
      email: emailName
    });
    /*fetch(`http://localhost:8000/user/${this.props.match.params.email}`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          user: json //stores the user info of that page url into an array to get the info easily
        });
      });*/
  }

  render() {
    return (
      <div className="users">
        This is the profile of {this.props.match.params.email}.
      </div>
    );
  }
}

export default User;
