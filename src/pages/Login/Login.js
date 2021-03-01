import React, { useState } from "react";
import "./Login.css";

import {connect} from "react-redux";

import { useHistory } from "react-router-dom";

import {
  signInWithGoogle,
  signInWithPassword,
} from "../../firebase/firebase.utils";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = ({userAuth}) => {
  const history = useHistory();
  const [validated, setValidated] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

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

  const onLogInWithGoogle = () => {
    signInWithGoogle();
    if (userAuth) {
      history.push("/home");
    }
  };

  const onLogInWithPassword = () => {
    signInWithPassword(loginEmail, loginPass);
    if (userAuth) {
      history.push("/home");
    }
  };

  return (
    <div className="container">
      <div className="row login-row">
        <div className="col-sm-6 login-col">
          <Form
            className="login-form justify-content-center"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                onChange={onEmailChange}
              />
              <Form.Control.Feedback type="invalid">
                Please type an email address
              </Form.Control.Feedback>
              <Form.Control.Feedback type="valid">
                Looks Good
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                onChange={onPassChange}
              />
              <Form.Control.Feedback type="invalid">
                Please type your password
              </Form.Control.Feedback>
              <Form.Control.Feedback type="valid">
                Looks Good
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              onClick={onLogInWithPassword}
              variant="primary"
              type="submit"
            >
              Log In
            </Button>
          </Form>
          <button onClick={onLogInWithGoogle} className="google_signIn">
            Sing in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state)=>{
  return{
    userAuth : state.userReducer.user
  }
}

export default connect(mapStateToProps)(Login);
