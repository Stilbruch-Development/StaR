import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "./../components/landing/Landing";
import Workplace from "./Workplace";
import AdminPanel from "./admin/AdminPanel";
import User from "../components/user/User";
import Login from "../components/auth/Login";
import PrivatRoute from "../utils/PrivatRoute";
import Alert from "../components/context/alert/Alert";
import authContext from "../components/context/auth/authContext";

const Main = () => {
  const { logout } = useContext(authContext);

  window.ipcRenderer.on("loggout", () => {
    logout();
  });

  return (
    <>
      <Switch>
        <PrivatRoute exact path="/workplace" component={Workplace} />
        <PrivatRoute exact path="/user" component={User} />
        <PrivatRoute exact path="/admin" component={AdminPanel} />
        <Route path="/login" component={Login} />
        <Route path="/*" component={Landing} />
      </Switch>
      <Alert />
    </>
  );
};

export default Main;
