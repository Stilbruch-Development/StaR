import React from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "./../components/landing/Landing";
import Workplace from "./Workplace";
import AdminPanel from "./admin/AdminPanel";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import PrivatRoute from "../utils/PrivatRoute";

const Main = () => {
  return (
    <Switch>
      <PrivatRoute exact path="/workplace" component={Workplace} />
      <PrivatRoute exact path="/admin" component={AdminPanel} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route path="/*" component={Landing} />
    </Switch>
  );
};

export default Main;
