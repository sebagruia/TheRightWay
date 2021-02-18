import React, { Fragment } from "react";
import "./App.css";

import { Route, Switch } from "react-router-dom";

import StartPage from "./pages/StartPage/StartPage";
import Navigation from "./components/Navigation/Navigation";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ListContent from "./pages/ListContent/ListContent";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <Fragment>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <StartPage />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
          <Route path="/listContent">
            <ListContent />
          </Route>
      </Switch>
    </Fragment>
  );
};

export default App;
