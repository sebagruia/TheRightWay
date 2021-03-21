import React, { useState } from 'react';
import './login.css';

import { connect } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { signInWithGoogle, signInWithPassword, createUserProfileDocument } from '../../firebase/firebase.utils';
import { setUser } from '../../redux/user/userActions';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = ({ dispatch }) => {
  const history = useHistory();
  const [validated, setValidated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const onEmailChange = (event) => {
    setLoginEmail(event.target.value);
  };

  const onPassChange = (event) => {
    setLoginPass(event.target.value);
  };

  const logInWithGoogle = async () => {
    const userAuth = await signInWithGoogle();
    if (userAuth) {
      history.push('/home');
    }
  };

  const logInWithPassword = async () => {
    const userAuth = await signInWithPassword(loginEmail, loginPass);
    if (userAuth) {
      if (userAuth.emailVerified) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapshot) => {
          dispatch(
            setUser({
              id: snapshot.id,
              ...snapshot.data(),
            })
          );
        });

        history.push('/home');
      } else {
        alert('You need to verify your email. Please check your Inbox and follow the link.');
      }
    }
  };

  return (
    <div className="container">
      <div className="row login-row">
        <div className="col-sm-6 login-col">
          <Form className="login-form justify-content-center" noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required onChange={onEmailChange} />
              <Form.Control.Feedback type="invalid">Please type an email address</Form.Control.Feedback>
              <Form.Control.Feedback type="valid">Looks Good</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" required onChange={onPassChange} />
              <Form.Control.Feedback type="invalid">Please type your password</Form.Control.Feedback>
              <Form.Control.Feedback type="valid">Looks Good</Form.Control.Feedback>
            </Form.Group>
            <Button onClick={logInWithPassword} variant="primary" type="submit">
              Log In
            </Button>
          </Form>
          <button onClick={logInWithGoogle} className="google_signIn">
            Sing in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default connect()(Login);
