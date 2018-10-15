import React, { Component } from "react";

class ListThreads extends Component {
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

  createThread = () => {};

  render() {
    var { isLoaded, threads } = this.state;
    if (!isLoaded) {
      return <div> Loading the threads, please wait... </div>;
    } else {
      return (
        <div className="listThreads">
          {threads.map(item => (
            <div className="card listThread-editor listThread-body">
              <h10>
                <div className="card-title" key={item.id}>
                  <a href="#">
                    Message from {item.from} - Subject: {item.subject}
                  </a>
                </div>
              </h10>
            </div>
          ))}
        </div>
      );
    }
  }
}

export default ListThreads;
