import React, {FC, ChangeEvent} from 'react';
import styles from './PassWordInput.module.scss';

import Form from 'react-bootstrap/esm/Form';

import { ValidationMessages } from '../../../interfaces/forms';


interface IProps {
    setLoginPass: (email: string) => void;
    validationMessage: ValidationMessages;
    label: string;
  }

const PassWordInput:FC<IProps> = ({setLoginPass, validationMessage, label}) => {
    const onPassChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLoginPass(event.target.value);
      };
  return (
    <Form.Group controlId="formBasicPassword" className=" passWordInput pb-2">
      <Form.Label className={styles.label}>{label}</Form.Label>
      <Form.Control
        className={styles.form_control_custom}
        type="password"
        placeholder="Password"
        required
        onChange={onPassChange}
      />
      <Form.Control.Feedback type="invalid">{validationMessage.invalid}</Form.Control.Feedback>
      <Form.Control.Feedback type="valid">{validationMessage.valid}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default PassWordInput;
