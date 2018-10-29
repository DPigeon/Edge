import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/login/index";
import Signup from "./components/signup/index";
import Messager from "./components/messager";
import ThreadList from "./components/threadList";
import Profile from "./components/profile";
import NotFound from "./components/notfound";

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/messages" component={Messager} />
    <Route path="/threads" component={ThreadList} />
    <Route path="/profile" component={Profile} />
    <Route component={NotFound} />
  </Switch>
);
