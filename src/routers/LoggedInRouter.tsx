import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Header } from "../components/Header";
import { useMe } from "../hooks/useMe";
import { Home } from "../pages/client/Home";
import { MyProfile } from "../pages/client/MyProfile";
import { AddPodcast } from "../pages/host/AddPodcast";
import { Dashboard } from "../pages/host/Dashboard";
import { MyPodcast } from "../pages/host/MyPodcast";
import { NotFound } from "../pages/NotFound";
import { UserRole } from "../__generated__/globalTypes";

const clientRoutes = [
  {
    path: "/",
    component: <Home />,
  },
];

const hostRoutes = [
  {
    path: "/",
    component: <Dashboard />,
  },
  {
    path: "/add-podcast",
    component: <AddPodcast />,
  },
  {
    path: "/podcast/:id",
    component: <MyPodcast />,
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

  console.log(data.me.role);

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
        {data.me.role === UserRole.Host &&
          hostRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
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
