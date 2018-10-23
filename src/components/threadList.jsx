import React, { Component } from "react";

class ThreadList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threads: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/threads")
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          threads: json
        });
      });
  }

  createThread = (id) => {
    
  };

  render() {
    var { isLoaded, threads } = this.state;
    if (!isLoaded) {
      return <div> Loading the threads, please wait... </div>;
    } else {
      return (
        <div className="ThreadList">
          {threads.map(item => (
            <div className="card listThread-editor listThread-body">
              <h10>
                <div className="card-title" key={item.id}>
                  <a href="messages/id">
                    Message from {item.from} - Subject: {item.subject}
                  </a>
                </div>
              </h10>
            </div>
          ))}
          <button className="btn btn-success" onClick={() => this.createThread(this.state.id)}>New Message</button>
        </div>
      );
    }
  }
}

export default ThreadList;
