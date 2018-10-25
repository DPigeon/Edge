import React from "react";

const Comments = props => (
  <div className="card post-editor post-body">
    <div className="card-title">
      <button
        class="btn btn-block"
        onClick={() => this.createComment()}
        type="button"
      >
        Comment
      </button>
    </div>
  </div>
);

export default Comments;
