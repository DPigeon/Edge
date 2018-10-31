import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/login/index";
import Signup from "./components/signup/index";
import Messager from "./components/threads/messager";
import ThreadList from "./components/threads/threadList";
import Profile from "./components/profile/index";
import Groups from "./components/groups/index";
import NotFound from "./components/other/notfound";

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/messages" component={Messager} />
    <Route path="/threads" component={ThreadList} />
    <Route path="/profile" component={Profile} />
    <Route path="/groups" component={Groups} />
    <Route component={NotFound} />
  </Switch>
);
