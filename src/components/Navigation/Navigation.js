import React, { Fragment } from "react";

import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { setUser } from "../../redux/user/userActions";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./Navigation.css";

const Navigation = ({ dispatch, changeLogStateToFalse, isLogedIn, user }) => {
  const history = useHistory();
  const initialUser = {
    name: "",
    email: "",
    container: [],
    joined: "",
  };

  const saveButtonFunctionalities = () => {
    fetch("https://limitless-atoll-58976.herokuapp.com/save", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        container: user.container,
      }),
    }).then((response) => response.json());
  };
  
  const LogOutButtonFunctionalities = () => {
    fetch("https://limitless-atoll-58976.herokuapp.com/logout", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        container: user.container,
      }),
    });
    changeLogStateToFalse();
    dispatch(setUser(initialUser));
  };

  if (!isLogedIn) {
    return (
      <div className="container-fluid header-container">
        <header className="col">
          <Navbar expand="lg" className="navbar-dark">
              <Navbar.Brand onClick={()=>{history.push("/home")}}>
                <h1 className="navbar-brand">
                  <span className="changedStyle">Do things</span> The Right Way
                </h1>
              </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <li className="nav-item item1 ml-auto ">
                  <Link
                    to="/login"
                    // id="buttonForAddingToDoList"
                    className="loginButton btn btn-outline-secondary wraper"
                  >
                    <h5 className="font-weight-light">Log In</h5>
                  </Link>
                  <Link
                    to="/register"
                    // id="buttonForAddingToDoList"
                    className="registerButton btn btn-outline-secondary wraper"
                  >
                    <h5 className="font-weight-light">Register</h5>
                  </Link>
                </li>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>
      </div>
    );
  } else {
    return (
      <div className="container-fluid header-container">
        <header className="col">
          <Navbar expand="lg" className="navbar-dark">
            <Navbar.Brand href="#home">
              <h1 className="navbar-brand">
                <span className="changedStyle">Do things</span> The Right Way
              </h1>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <li className="nav-item item1 ml-auto ">
                  <h5 className="welcome"> Welcome {`${user.name}`}</h5>
                  <Link
                    className="saveExitButton btn btn-outline-secondary wraper"
                    onClick={() => saveButtonFunctionalities()}
                  >
                    <h5>Save</h5>
                  </Link>
                  <Link
                    className="saveExitButton btn btn-outline-secondary wraper"
                    onClick={() => LogOutButtonFunctionalities()}
                  >
                    <h5>Log out</h5>
                  </Link>
                </li>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>
      </div>
    );
  }
};

export default connect()(Navigation);
