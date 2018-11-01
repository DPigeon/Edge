import React, { Component } from "react";
import "./styles/groups.css";

class Groups extends Component {
  state = {
    items: []
  };

  //TESTING THE GROUPS, NOT OFFICIAL FOR NOW
  render() {
    return (
      <div className="groups">
        <div className="aGroup">
          <ul>
            <li>
              <h5>The Edgers</h5>
              <p>Description: We are a team of a Project for SOEN341.</p>
              <h8>
                Team members: David, Marwan, Ribal, Anas, Maria and Ruslan
              </h8>
              <br />
              <button className="btn btn-success">Join</button>
            </li>
          </ul>
          <ul>
            <li>
              <h5>NHL Lovers</h5>
              <p>Description: We like hockey so join us!!</p>
              <h8>Team members: Anas and David</h8>
              <br />
              <button className="btn btn-success">Join</button>
            </li>
          </ul>
        </div>
        <ul>
          {this.state.items.map(item => (
            <div className="card">
              <li key={item.id}>
                <h5>
                  <div className="card-title">{item.title}</div>
                </h5>
                <div className="itemMsg">
                  <p className="msg">{item.names}</p>
                </div>
              </li>
            </div>
          ))}
        </ul>
        <a href="/creategroup">
          <button>Create Group</button>
        </a>
      </div>
    );
  }
}

export default Groups;
