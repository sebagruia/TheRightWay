import React, { Fragment } from "react";
import "./App.css";

import { Route } from "react-router-dom";

import StartPage from "./pages/StartPage/StartPage";
import Navigation from "./components/Navigation/Navigation";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <Fragment>
      <Navigation />
      <Route path="/">
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
    </Fragment>
  );
};

export default App;
