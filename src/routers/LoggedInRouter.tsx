import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Header } from "../components/Header";
import { useMe } from "../hooks/useMe";
import { Home } from "../pages/client/Home";
import { MyProfile } from "../pages/client/MyProfile";
import { AddEpisode } from "../pages/host/AddEpisode";
import { AddPodcast } from "../pages/host/AddPodcast";
import { Dashboard } from "../pages/host/Dashboard";
import { EditPodcast } from "../pages/host/EditPodcast";
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
    path: "/podcast/add",
    component: <AddPodcast />,
  },
  {
    path: "/podcast/:id",
    component: <MyPodcast />,
  },
  {
    path: "/podcast/:id/edit",
    component: <EditPodcast />,
  },
  {
    path: "/podcast/:id/episode/add",
    component: <AddEpisode />,
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
