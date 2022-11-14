import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Login from "./components/layouts/login";
import Main from "./components/layouts/main";
import Users from "./components/layouts/users";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/users/:userId?/:edit?" component={Users} />
        <Route path="/login/:type?" component={Login} />
        <Route path="/" component={Main} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}
export default App;
