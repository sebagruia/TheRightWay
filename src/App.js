import React, { useEffect, Fragment } from 'react';
import './App.css';
import { connect } from 'react-redux';

import { Route, Switch } from 'react-router-dom';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setUser } from './redux/user/userActions';

import StartPage from './pages/StartPage/StartPage';
import Navigation from './components/Navigation/Navigation';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ListContent from './pages/ListContent/ListContent';
import Home from './pages/Home/Home';

const App = ({ setCurrentUser }) => {
  useEffect(() => {
    const unsubscribFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      console.log(userAuth);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      } else {
        setCurrentUser(userAuth);
      }

      return () => {
        unsubscribFromAuth();
      };
    });
  }, [setCurrentUser]);

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

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(setUser(user)),
  };
};

export default connect(null, mapDispatchToProps)(App);
