import React, { Component } from "react";

class SearchGroup extends Component {
  constructor() {
    super();
    this.state = {
      search: [],
      groups: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/groups")
      .then(res => res.json())
      .then(json => {
        this.setState({
          groups: json
        });
      });
  }

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  render() {
    let filteredSearch = this.state.groups.filter(group => {
      //if you cannot find this search within it, do not return it
      return group.title.toLowerCase().indexOf(this.state.search) !== -1;
    });
    return (
      <div>
        <center>
          <h4>Group Search</h4>
          <input
            type="text"
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
          />
          <ul>
            {filteredSearch.map(item => (
              <div className="cardmessage">
                <li key={item.id}>
                  <h5>
                    <div className="title">
                      <a href={"/groups/" + item.title}>
                        {item.title} ID: {item.id}
                      </a>
                    </div>
                  </h5>
                  <h10>
                    <div className="description">{item.description}</div>
                  </h10>
                </li>
              </div>
            ))}
          </ul>
        </center>
      </div>
    );
  }
}

export default SearchGroup;
