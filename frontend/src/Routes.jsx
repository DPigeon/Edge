import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/login/index";
import Signup from "./components/signup/index";
import Messager from "./components/threads/messager";
import ThreadList from "./components/threads/threadList";
import Profile from "./components/profile/index";
import GroupList from "./components/groups/groupList";
import CreateGroup from "./components/groups/createGroup";
import ForgotPassword from "./components/login/forgotPassword/forgotPass";
import EnterCode from "./components/login/forgotPassword/enterCode";
import NewPassword from "./components/login/forgotPassword/changePassword";
import IndividualGroup from "./components/groups/individualGroup";
import NotFound from "./components/other/notfound";

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/messages" component={Messager} />
      <Route path="/threads" component={ThreadList} />
      <Route path="/user/:email" component={Profile} />
      <Route path="/groups" component={GroupList} />
      <Route path="/creategroup" component={CreateGroup} />
      <Route path="/forgotpassword" component={ForgotPassword} />
      <Route path="/code/:email" component={EnterCode} />
      <Route path="/newpassword/:email" component={NewPassword} />
      <Route path="/group/:groupId" component={IndividualGroup} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);
