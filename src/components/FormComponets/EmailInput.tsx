import React, { ChangeEvent, FC } from 'react';
import styles from './EmailInput.module.scss';

import Form from 'react-bootstrap/esm/Form';

import { EmailValidationMessages } from '../../interfaces/forms';

interface IProps {
  setLoginEmail: (email: string) => void;
  validationMessage: EmailValidationMessages;
  label: string;
}

const EmailInput: FC<IProps> = ({ setLoginEmail, validationMessage, label }) => {
  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginEmail(event.target.value);
  };
  return (
    <Form.Group controlId="formBasicEmail" className="emailInput pb-2">
      <Form.Label className={styles.label}>{label}</Form.Label>
      <Form.Control
        className={styles.form_control_custom}
        type="email"
        placeholder="Enter email"
        required
        onChange={onEmailChange}
      />
      <Form.Control.Feedback type="invalid">{validationMessage.invalid}</Form.Control.Feedback>
      <Form.Control.Feedback type="valid">{validationMessage.valid}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default EmailInput;
