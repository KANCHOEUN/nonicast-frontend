import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Header } from "../components/Header";
import { AccessDenied } from "../pages/AccessDenied";
import { Home } from "../pages/client/Home";
import { Login } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import { SignUp } from "../pages/SignUp";

export const LoggedOutRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/">
          <AccessDenied />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
