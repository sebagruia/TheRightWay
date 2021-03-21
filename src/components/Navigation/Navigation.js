import React from 'react';

import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { signOut } from '../../firebase/firebase.utils';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './Navigation.css';

const Navigation = ({ userAuth }) => {
  const history = useHistory();

  // const save = () => {};

  const logOut = async () => {
    await signOut();
  };

  return (
    <div className="container-fluid header-container">
      <header className="col">
        <Navbar expand="lg" className="navbar-dark">
          <Navbar.Brand
            onClick={() => {
              history.push('/home');
            }}
          >
            <h1 className="navbar-brand">
              <span className="changedStyle">Do things</span> The Right Way
            </h1>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <li className="nav-item item1 ml-auto ">
                <h5 className="welcome">{userAuth ? `Welcome ${userAuth.displayName}` : ''}</h5>
                <Link to="/login" onClick={userAuth && logOut} className="loginButton btn btn-outline-secondary wraper">
                  <h5 className="font-weight-light">{userAuth ? 'Log out' : 'Log in'}</h5>
                </Link>
                <Link to="/register" className="registerButton btn btn-outline-secondary wraper">
                  <h5 className="font-weight-light">{userAuth ? 'Save' : 'Register'}</h5>
                </Link>
              </li>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userAuth: state.userReducer.user,
  };
};

export default connect(mapStateToProps)(Navigation);
