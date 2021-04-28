import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './landing/Landing';
import Workplace from './Workplace';
import AdminPanel from './admin/AdminPanel';
import User from './user/User';
import Login from './auth/Login';
import PrivatRoute from '../utils/PrivatRoute';
import Alert from './context/alert/Alert';
import authContext from './context/auth/authContext';

const Main = () => {
  const { logout } = { ...useContext(authContext) };

  window.electron.receiveLogout(() => {
    logout();
  });

  return (
    <div data-testid="MainComponent">
      <Switch>
        <PrivatRoute exact path="/workplace" component={Workplace} />
        <PrivatRoute exact path="/user" component={User} />
        <PrivatRoute exact path="/admin" component={AdminPanel} />
        <Route path="/login" component={Login} />
        <Route path="/*" component={Landing} />
      </Switch>
      <Alert />
    </div>
  );
};

export default Main;
