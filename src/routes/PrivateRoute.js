import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return isAuthenticated ? (
    <Route {...rest} />
  ) : (
    <Route
      {...rest}
      render={props => (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )}
    />
  );
};

export default PrivateRoute;
