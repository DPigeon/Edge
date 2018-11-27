import React, { Component } from "react";

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
          {this.props.commentBody}
        </div>
      </div>
    );
  }
}

export default Comments;
