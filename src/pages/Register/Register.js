import React, { useState } from 'react';
import './Register.css';
import { useHistory } from 'react-router-dom';
import { registerNewUser, createUserProfileDocument } from '../../firebase/firebase.utils';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Register = () => {
  const history = useHistory();
  const [validated, setValidated] = useState(false);
  const [registerName, setLoginName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPass, setRegisterPass] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const onNameChange = (event) => {
    setLoginName(event.target.value);
  };

  const onEmailChange = (event) => {
    setRegisterEmail(event.target.value);
  };
  const onPassChange = (event) => {
    setRegisterPass(event.target.value);
  };

  const register = async () => {
    try {
      const userAuth = await registerNewUser(registerEmail, registerPass);
      if (userAuth.uid) {
        await createUserProfileDocument(userAuth, { displayName: registerName });
        history.push('/home');
      }
    } catch (error) {
      console.log(`Error registering new user ${error}`);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 offset-sm-3">
          <Form
            className="register-form justify-content-center"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Form.Group controlId="formBasicName">
              <Form.Label className="label">Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" required onChange={onNameChange} />
              <Form.Control.Feedback type="invalid">Please type your name</Form.Control.Feedback>
              <Form.Control.Feedback type="valid">Looks Good</Form.Control.Feedback>
            </Form.Group>

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
            <Button variant="primary" type="submit" onClick={register}>
              Register
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
