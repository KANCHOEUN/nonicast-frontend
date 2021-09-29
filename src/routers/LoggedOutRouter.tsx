import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";

export const LoggedOutRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/sign-up">
          <SignUp />
        </Route>
        <Route>{/* 404 Not Found */}</Route>
      </Switch>
    </BrowserRouter>
  );
};
