import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import Login from "./components/layouts/login";
import Main from "./components/layouts/main";
import Users from "./components/layouts/users";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/users/:userId?" component={Users} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Main} />
      </Switch>
    </>
  );
}
export default App;
