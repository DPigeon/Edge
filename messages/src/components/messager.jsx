import React, { Component } from "react";

class Messager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/messages")
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json
        });
      });
  }

  render() {
    var { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <div> Loading, please wait... </div>;
    } else {
      //Data has been loaded
      return (
        <div>
          <div className="navbar navbar-toggler badge-dark navbar-collapse">
            Inbox Messages
          </div>
          <ul>
            {items.map(item => (
              <div className="card messager-editor messager-body">
                <li key={item.id}>
                  <h3>
                    <div className="card-title">Message from {item.from}</div>
                  </h3>
                  <div className="card-block">{item.msg}</div>
                </li>
              </div>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export default Messager;
