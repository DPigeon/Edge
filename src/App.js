import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import Routes from "./Routes";

class App extends Component {
  render() {
    return (
      <div className="App container">
        <nav class="navbar navbar-expand-lg navbar-light bg-secondary">
          <a class="navbar-brand" href="/">
            Edge
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon" />
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="/">
                  Home <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/login">
                  Login
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/signup">
                  Signup
                </a>
              </li>
              <li class="nav-item" />
            </ul>
          </div>
        </nav>
        <p>Making your life better</p>
        <Routes />
      </div>
    );
  }
}

export default App;
