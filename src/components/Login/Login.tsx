import React, { ChangeEvent, FC, FormEvent, Fragment, useState, useCallback } from 'react';
import styles from './Login.module.scss';

import { connect, useDispatch } from 'react-redux';
import { clearStateAction } from '../../redux/list/listActions';
import { initialState } from '../../redux/list/listReducer';
import { stateMapping } from '../../redux/stateMapping';
import { persistor } from '../../redux/store';
import { setModalMessage, setUser } from '../../redux/user/userActions';

import { useNavigate } from 'react-router-dom';

import { DocumentData } from 'firebase/firestore';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import EmailInput from '../FormComponets/EmailInput';
import ModalPopUp from '../ModalPopUp/ModalPopUp';

import { ModalHeaderBackground, ModalMessage } from '../../interfaces/modal';

import { createUserProfileDocument, signInWithGoogle, signInWithPassword } from '../../firebase/firebase.utils';

interface IProps {
  error: ModalMessage;
}

const Login: FC<IProps> = ({ error }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    dispatch(clearStateAction(initialState));
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const onPassChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginPass(event.target.value);
  };

  const logInWithGoogle = async () => {
    await persistor.purge();
    const userAuth = await signInWithGoogle(dispatch);
    if (userAuth) {
      navigate('/lists');
    }
  };

  const logInWithPassword = async () => {
    const userAuth = await signInWithPassword(loginEmail, loginPass, dispatch);
    if (userAuth) {
      if (userAuth.emailVerified) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef?.onSnapshot((snapshot: DocumentData) => {
          dispatch(
            setUser({
              id: snapshot.id,
              ...snapshot.data(),
            }),
          );
        });
        navigate('/');
      } else {
        dispatch(
          setModalMessage({
            title: 'Email Validation',
            content: 'You need to verify your email. Please check your Inbox and follow the link.',
            headerBackground: ModalHeaderBackground.warning,
          }),
        );
      }
    }
  };

  const closeModal = () => {
    dispatch(setModalMessage({ content: '' }));
  };

  return (
    <Fragment>
      <ModalPopUp message={error} closeModal={closeModal} closeText="Close" />
      <div className="container">
        <div className={`row ${styles.login_row}`}>
          <div className={`col-sm-6 ${styles.login_col}`}>
            <Form
              className={`${styles.login_form} justify-content-center`}
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              {/* <Form.Group controlId="formBasicEmail" className="pb-2">
                <Form.Label className={styles.label}>Email address</Form.Label>
                <Form.Control
                  className={styles.form_control_custom}
                  type="email"
                  placeholder="Enter email"
                  required
                  onChange={onEmailChange}
                />
                <Form.Control.Feedback type="invalid">Please type an email address</Form.Control.Feedback>
                <Form.Control.Feedback type="valid">Looks Good</Form.Control.Feedback>
              </Form.Group> */}

              <EmailInput
                setLoginEmail={setLoginEmail}
                validationMessage={{ valid: 'Looks Good', invalid: 'Please type an email address' }}
                label="Email address"
              />

              <Form.Group controlId="formBasicPassword" className="pb-2">
                <Form.Label className={styles.label}>Password</Form.Label>
                <Form.Control
                  className={styles.form_control_custom}
                  type="password"
                  placeholder="Password"
                  required
                  onChange={onPassChange}
                />
                <Form.Control.Feedback type="invalid">Please type your password</Form.Control.Feedback>
                <Form.Control.Feedback type="valid">Looks Good</Form.Control.Feedback>
              </Form.Group>
              <Button
                className={`mt-3 ${styles.btn_primary_custom}`}
                onClick={logInWithPassword}
                variant="primary"
                type="submit"
                size="sm"
              >
                Log In
              </Button>
            </Form>
            <Button variant="outline-warning" onClick={logInWithGoogle}>
              <span>Sign in with Google</span>
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => {
  const sm = stateMapping(state);
  return {
    error: sm.userError,
  };
};

export default connect(mapStateToProps)(Login);
