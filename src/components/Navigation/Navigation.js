import React from 'react';

import { connect } from 'react-redux';
import { clearStateAction } from '../../redux/list/listActions';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Navigation.module.scss';

import { signOutUser } from '../../firebase/firebase.utils';

const Navigation = ({ dispatch, userAuth }) => {
  const navigate = useNavigate();

  const logOut = async () => {
    dispatch(clearStateAction());
    await signOutUser();
  };

  return (
    <div className={`container-fluid ${styles.header_container}`}>
      <header className="col">
        <Navbar expand="lg" className="navbar-dark">
          <Navbar.Brand
            onClick={() => {
              navigate('/home');
            }}
          >
            <h1 className="navbar-brand">
              <span className={styles.changedStyle}>Do things</span> The Right Way
            </h1>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <li className={`nav-item ${styles.item1} ${styles.nav_item_custom} ml-auto`}>
                <h5 className={styles.welcome}>{userAuth ? `Welcome ${userAuth.displayName}` : ''}</h5>
                <Link to="/login" onClick={userAuth && logOut} className={`btn btn-outline-secondary ${styles.wraper}`}>
                  <span className="font-weight-light">{userAuth ? 'Log out' : 'Log in'}</span>
                </Link>
                <Link to="/register" className={`btn btn-outline-secondary ${styles.wraper}`}>
                  <span className="font-weight-light">{userAuth ? 'Save' : 'Register'}</span>
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
