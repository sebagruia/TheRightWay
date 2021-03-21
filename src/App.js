import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';

import { useHistory, Route, Switch } from 'react-router-dom';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setUser } from './redux/user/userActions';
import { fetchUserLists, clearListsAction } from './redux/list/listActions';

import StartPage from './pages/StartPage/StartPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ListContentPage from './pages/ListContentPage/ListContentPage';
import HomePage from './pages/HomePage/HomePage';

const App = ({ getUserLists, selectedList, user, setCurrentUser, clearAllLists }) => {
  const history = useHistory();

  useEffect(() => {
    const unsubscribFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      console.log(userAuth);
      if (userAuth && userAuth.emailVerified) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
        getUserLists(userAuth.uid);
      } else {
        setCurrentUser(null);
        clearAllLists(null);
        history.push('/home');
      }

      return () => {
        unsubscribFromAuth();
      };
    });
  }, [history, getUserLists, setCurrentUser, clearAllLists]);

  return (
    <Switch>
      <Route exact path="/">
        <StartPage />
      </Route>
      <Route exact path="/home">
        <HomePage />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/register">
        <RegisterPage />
      </Route>
      <Route path="/listContent">
        <ListContentPage />
      </Route>
    </Switch>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(setUser(user)),
    getUserLists: (user) => dispatch(fetchUserLists(user)),
    clearAllLists: () => dispatch(clearListsAction()),
  };
};

export default connect(null, mapDispatchToProps)(App);
