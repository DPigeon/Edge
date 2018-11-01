import React, { Component } from "react";

class CreateGroup extends Component {
  state = {
    ids: []
  };
  render() {
    return (
      <div className="createGroup">
        <h1>Fill in the form to create a new group</h1>
        <form action="/groups">
          <input placeHolder="Title" />
          <br />
          <br />
          <input placeHolder="Add group members" />
          <br />
          <br />
          <input placeHolder="Group description" />
          <br />
          <br />
          <input type="submit" value="Create" />
        </form>
      </div>
    );
  }
}

export default CreateGroup;
