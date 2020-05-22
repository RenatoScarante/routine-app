import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import DefaultLayout from "../layouts/Default";
import DashboardLayout from "../layouts/Dashboard";

import PrivateRoute from "./PrivateRoute";

import Landing from "../pages/Landing";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Page404 from "../pages/misc/Page404";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact={true}
          render={props => (
            <DefaultLayout>
              <Landing {...props} />
            </DefaultLayout>
          )}
        />
        <Route
          path="/login"
          exact={true}
          render={props => (
            <DefaultLayout>
              <Login {...props} />
            </DefaultLayout>
          )}
        />
        <Route
          path="/register"
          exact={true}
          render={props => (
            <DefaultLayout>
              <Register {...props} />
            </DefaultLayout>
          )}
        />
        <PrivateRoute
          path="/dashboard"
          exact={true}
          render={props => (
            <DashboardLayout>
              <Home {...props} />
            </DashboardLayout>
          )}
        />
        <PrivateRoute
          path="/dashboard/tasks"
          exact={true}
          render={props => (
            <DashboardLayout>
              <Home {...props} />
            </DashboardLayout>
          )}
        />
        <Route
          render={() => (
            <DefaultLayout>
              <Page404 />
            </DefaultLayout>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
