import React, { FC, useEffect } from 'react';

import './App.scss';

import { Route, Routes, useNavigate } from 'react-router-dom';

import { connect, useDispatch } from 'react-redux';
import { setUser } from './redux/user/userActions';

import EditItemPage from './pages/EditItemPage/EditItemPage';
import HomePage from './pages/HomePage/HomePage';
import ListContentPage from './pages/ListContentPage/ListContentPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import StartPage from './pages/StartPage/StartPage';
import RemindersPage from './pages/RemindersPage/RemindersPage';

import { DocumentData } from 'firebase/firestore';

import { auth, createUserProfileDocument, fetchUserLists } from './firebase/firebase.utils';

interface IProps {
  getUserLists: (userId: string) => any;
}

const App: FC<IProps> = ({ getUserLists }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth && userAuth.emailVerified) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef?.onSnapshot((snapshot: DocumentData) => {
          dispatch(
            setUser({
              id: snapshot.id,
              ...snapshot.data(),
            }),
          );
          getUserLists(userAuth.uid);
        });
      } else {
        dispatch(setUser(null));
      }

      return () => {
        unsubscribFromAuth();
      };
    });
  }, [navigate, getUserLists]);

  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/lists" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/lists/:listId" element={<ListContentPage />} />
      <Route path="/editItem/:itemId" element={<EditItemPage />} />
      <Route path="/reminders" element={<RemindersPage />} />
      <Route path="/reminders/:reminderId" element={<RemindersPage />} />
    </Routes>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  getUserLists: (userId: string) => dispatch(fetchUserLists(userId)),
});

export default connect(null, mapDispatchToProps)(App);
