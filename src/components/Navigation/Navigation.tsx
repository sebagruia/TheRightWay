import React, {FC} from 'react';

import { connect, useDispatch } from 'react-redux';
import { clearStateAction } from '../../redux/list/listActions';
import { stateMapping } from '../../redux/stateMapping';
import {initialState} from "../../redux/list/listReducer"
import {persistor} from "../../redux/store";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Navigation.module.scss';


import { signOutUser } from '../../firebase/firebase.utils';

interface IProps {
  userAuth: any;
}

const Navigation:FC<IProps> = ({ userAuth }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  const logOut = async () => {
    await persistor.purge();
    dispatch(clearStateAction(initialState));
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
            <h1 className="navbar-brand ps-3">
              <span className={styles.changedStyle}>Do things</span> The Right Way
            </h1>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" className='me-3'/>
          <Navbar.Collapse id="basic-navbar-nav" className='me-3'>
            <Nav className="me-auto">
              <li className={`nav-item ${styles.item1} ${styles.nav_item_custom} ms-auto`}>
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

const mapStateToProps = (state:any) => {
  const sm  = stateMapping(state);
  return {
    userAuth: sm.userAuth,
  };
};

export default connect(mapStateToProps)(Navigation);
