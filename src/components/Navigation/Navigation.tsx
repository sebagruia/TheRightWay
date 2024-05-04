import React, { FC, useState } from 'react';

import { connect, useDispatch } from 'react-redux';
import { clearStateAction } from '../../redux/list/listActions';
import { initialState } from '../../redux/list/listReducer';
import { stateMapping } from '../../redux/stateMapping';
import { persistor } from '../../redux/store';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useNavigate } from 'react-router-dom';

import { BsBell, BsCardChecklist } from 'react-icons/bs';

import { signOutUser } from '../../firebase/firebase.utils';

import styles from './Navigation.module.scss';

interface IProps {
  userAuth: any;
}

const Navigation: FC<IProps> = ({ userAuth }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const logOut = async () => {
    await persistor.purge();
    dispatch(clearStateAction(initialState));
    await signOutUser();
  };

  const handleClickMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <div className={`container-fluid ${styles.header_container}`}>
      <header className={`col ${styles.header}`}>
        <Navbar expand="" className="navbar-dark">
          <Navbar.Brand
            onClick={() => {
              navigate('/');
            }}
          >
            <h1 className="navbar-brand ps-3 pt-1">
              <span className={styles.changedStyle}>Do things</span> The Right Way
            </h1>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-3 offcanvasNavbar-expand"  onClick={handleClickMenu}/>
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand"
            className={styles.offCanvas}
            aria-labelledby="offcanvasNavbar-expand"
            placement="start"
            show={showMenu}
          >
            <Offcanvas.Header className={styles.offCanvasHeader} closeButton closeVariant="white" onClick={handleClickMenu} >
              <Offcanvas.Title
                id="offcanvasNavbarLabel-expand"
                onClick={() => {
                  navigate('/');
                  setShowMenu(false);
                }}
              >
                <h1 className="navbar-brand ps-3">
                  <span className={styles.changedStyle}>Do things</span> The Right Way
                </h1>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="me-auto ps-3 d-flex flex-column row-gap-4 ">
                <li className={`nav-item pb-3 ${styles.nav_item_custom}`}>
                  <h5 className={styles.welcome}>{userAuth ? `Welcome ${userAuth.displayName}` : ''}</h5>
                </li>
                <Link
                  to="/reminders"
                  onClick={closeMenu}
                  className={`nav-item column-gap-2  ${styles.nav_item_custom}`}
                >
                  <BsBell />
                  <h5>Reminders</h5>
                </Link>
                <Link to="/lists" onClick={closeMenu} className={`nav-item column-gap-2  ${styles.nav_item_custom}`}>
                  <BsCardChecklist />
                  <h5>Favorite Lists</h5>
                </Link>
                <li className={`nav-item ${styles.item1} ${styles.nav_item_custom}`}>
                  <Link
                    to="/login"
                    onClick={userAuth && logOut}
                    className={`btn btn-outline-secondary ${styles.wraper}`}
                  >
                    <span className="font-weight-light">{userAuth ? 'Log out' : 'Log in'}</span>
                  </Link>
                  <Link to="/register" className={`btn btn-outline-secondary ${styles.wraper}`}>
                    <span className="font-weight-light">{userAuth ? 'Save' : 'Register'}</span>
                  </Link>
                </li>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          {/* <Navbar.Collapse id="basic-navbar-nav" className="me-3">
            <Nav className="me-auto ps-3 d-flex flex-column row-gap-3 ">
              <li className={`nav-item pb-3 ${styles.nav_item_custom}`}>
                <h5 className={styles.welcome}>{userAuth ? `Welcome ${userAuth.displayName}` : ''}</h5>
              </li>
              <Link to="/reminders" className={`nav-item column-gap-2  ${styles.nav_item_custom}`}>
                <BsBell />
                <h5>Reminders</h5>
              </Link>
              <li className={`nav-item column-gap-2  ${styles.nav_item_custom}`}>
                <BsCardChecklist />
                <h5>Favorite Lists</h5>
              </li>
              <li className={`nav-item ${styles.item1} ${styles.nav_item_custom}`}>
                <Link to="/login" onClick={userAuth && logOut} className={`btn btn-outline-secondary ${styles.wraper}`}>
                  <span className="font-weight-light">{userAuth ? 'Log out' : 'Log in'}</span>
                </Link>
                <Link to="/register" className={`btn btn-outline-secondary ${styles.wraper}`}>
                  <span className="font-weight-light">{userAuth ? 'Save' : 'Register'}</span>
                </Link>
              </li>
            </Nav>
          </Navbar.Collapse> */}
        </Navbar>
      </header>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const sm = stateMapping(state);
  return {
    userAuth: sm.userAuth,
  };
};

export default connect(mapStateToProps)(Navigation);
