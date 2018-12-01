import React, { Component } from "react";
import Parser from "html-react-parser";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="commentcard">
        <div className="commentname">
          <h6>
            Comment by <a href={"/user/" + this.props.by}>{this.props.by}</a>
          </h6>
          {Parser(this.props.commentBody)}
        </div>
      </div>
    );
  }
}

export default Comments;
