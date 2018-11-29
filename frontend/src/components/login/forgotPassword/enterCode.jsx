import React, { Component } from "react";
import NotFound from "../../other/notfound";

class EnterCode extends Component {
  state = {
    code: ""
  };

  hasAccessToThePage() {
    var access = false;
  }

  render() {
    if (this.hasAccessToThePage() === true) {
      return <div>codes</div>;
    } else {
      return (
        <div>
          <NotFound />
        </div>
      );
    }
  }
}

export default EnterCode;
