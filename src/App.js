import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';

import { Route, Routes, useNavigate } from 'react-router-dom';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { clearStateAction, fetchUserLists } from './redux/list/listActions';
import { setUser } from './redux/user/userActions';

import HomePage from './pages/HomePage/HomePage';
import ListContentPage from './pages/ListContentPage/ListContentPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import StartPage from './pages/StartPage/StartPage';

const App = ({ getUserLists, setCurrentUser, clearState }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribFromAuth = auth.onAuthStateChanged(async (userAuth) => {
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
      }

      return () => {
        unsubscribFromAuth();
      };
    });
  }, [navigate, getUserLists, setCurrentUser, clearState]);

  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/listContent" element={<ListContentPage />} />
    </Routes>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => dispatch(setUser(user)),
    getUserLists: (user) => dispatch(fetchUserLists(user)),
    clearState: () => dispatch(clearStateAction()),
  };
};

export default connect(null, mapDispatchToProps)(App);
