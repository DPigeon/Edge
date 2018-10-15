import React, {
  Component
} from "react";
import Reply from "./components/reply.jsx";
import Messager from "./components/messager.jsx";
import "./App.css";

class App extends Component {

  componentDidMount() {}

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