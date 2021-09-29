import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Header } from "../components/Header";
import { Home } from "../pages/client/Home";
import { NotFound } from "../pages/NotFound";

export const LoggedInRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
