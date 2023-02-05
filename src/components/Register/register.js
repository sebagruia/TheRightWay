import React, { useState } from 'react';
import styles from './Register.module.scss';

import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { createUserProfileDocument, registerNewUser } from '../../firebase/firebase.utils';

const Register = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [registerName, setLoginName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPass, setRegisterPass] = useState(undefined);
  const [confirmPass, setConfirmPass] = useState(undefined);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    console.log(form.checkValidity());
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

  const onConfirmPassChange = (event) => {
    setConfirmPass(event.target.value);
  };

  const checkPasswordMatch = () => {
    if (registerPass !== undefined && confirmPass !== undefined && registerPass !== '' && confirmPass !== '') {
      if (registerPass === confirmPass) {
        return 'valid';
      }
      return 'invalid';
    }
  };

  const register = async () => {
    if (confirmPass === registerPass) {
      try {
        const userAuth = await registerNewUser(registerEmail, registerPass);
        if (userAuth.uid) {
          await createUserProfileDocument(userAuth, { displayName: registerName });
          navigate('/login');
        }
      } catch (error) {
        console.log(`Error registering new user ${error}`);
      }
    } 
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 offset-sm-3">
          <Form
            className={`${styles.register_form} justify-content-center`}
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Form.Group controlId="formBasicName" className='pb-2'>
              <Form.Label className={styles.label}>Name</Form.Label>
              <Form.Control
                className={styles.form_control_custom}
                type="text"
                placeholder="Enter Name"
                required
                onChange={onNameChange}
              />
              <Form.Control.Feedback type="invalid">Please type your name</Form.Control.Feedback>
              <Form.Control.Feedback type="valid">Looks Good</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className='pb-2'>
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
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className='pb-2'>
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

            <Form.Group controlId="formCheckBasicPassword" className='pb-2'>
              <Form.Label className={styles.label}>Confirm Password</Form.Label>
              <Form.Control
                className={styles.form_control_custom}
                type="password"
                placeholder="Password"
                required
                onChange={onConfirmPassChange}
              />
              {checkPasswordMatch() === 'invalid' ? (
                <Form.Control.Feedback className="text-danger">Please check your password</Form.Control.Feedback>
              ) : (
                <Form.Control.Feedback>Looks Good</Form.Control.Feedback>
              )}
            </Form.Group>
            <Button
              className={`${styles.btn_primary_custom} mt-3`}
              variant="primary"
              size="sm"
              type="submit"
              onClick={register}
            >
              Register
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
