import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Header } from "../components/Header";
import { useMe } from "../hooks/useMe";
import { Home } from "../pages/client/Home";
import { MyProfile } from "../pages/client/MyProfile";
import { NotFound } from "../pages/NotFound";
import { UserRole } from "../__generated__/globalTypes";

const clientRoutes = [
  {
    path: "/",
    component: <Home />,
  },
];

const commonRoutes = [
  {
    path: "/user/:id",
    component: <MyProfile />,
  },
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();

  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        {data.me.role === UserRole.Listener &&
          clientRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        {/* {
        data.me.role === UserRole.Host && 
      } */}
        {commonRoutes.map((route) => (
          <Route exact key={route.path} path={route.path}>
            {route.component}
          </Route>
        ))}
        {
          <Route>
            <NotFound />
          </Route>
        }
      </Switch>
    </BrowserRouter>
  );
};
