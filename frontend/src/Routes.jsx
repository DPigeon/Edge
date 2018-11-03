import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/login/index";
import Signup from "./components/signup/index";
import Messager from "./components/threads/messager";
import ThreadList from "./components/threads/threadList";
import Profile from "./components/profile/index";
import Groups from "./components/groups/index";
import CreateGroup from "./components/groups/createGroup";
import ForgotPassword from "./components/login/forgotPassword/forgotPass";
import NotFound from "./components/other/notfound";

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/messages" component={Messager} />
      <Route path="/threads" component={ThreadList} />
      <Route path="/profile" component={Profile} />
      <Route path="/groups" component={Groups} />
      <Route path="/creategroup" component={CreateGroup} />
      <Route path="/forgotpassword" component={ForgotPassword} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);
