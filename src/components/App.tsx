import { useReactiveVar } from "@apollo/client";
import React from "react";
import { isLoggedInVar } from "../apollo";
import { LoggedInRouter } from "../routers/LoggedInRouter";
import { LoggedOutRouter } from "../routers/LoggedOutRouter";

export const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
};

export default App;
