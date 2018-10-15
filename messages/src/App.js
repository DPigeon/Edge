import React, {
  Component
} from "react";
import Reply from "./components/reply.jsx";
import Messager from "./components/messager.jsx";
import "./App.css";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false
    }
  }

  componentDidMount() { //request data from  server
    fetch('http://localhost:3001/messages')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json,
        })

      });
  }

  render() {

    return ( <
      React.Fragment >
      <
      main className = "container" / >
      <
      Messager / >
      <
      Reply / >
      <
      /React.Fragment>
    );
  }
}


export default App;