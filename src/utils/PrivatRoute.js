import React, { useContext } from "react";
import AuthContext from "../components/context/auth/authContext";
import { Route, Redirect } from "react-router-dom";

const PrivatRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivatRoute;
