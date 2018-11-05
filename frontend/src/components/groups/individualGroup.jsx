import React, { Component } from "react";
import PostDisplay from "../post/postDisplay";

class IndividualGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Members: [],
      firstname: "",
      lastname: ""
    };
  }

  render() {
    return (
      <div className="individualGroup">
        <div>Hi ok</div>
      </div>
    );
  }
}

export default IndividualGroup;
