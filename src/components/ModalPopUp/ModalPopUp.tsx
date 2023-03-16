import React, { FC } from 'react';
import styles from '../ModalPopUp/ModalPopUp.module.scss';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {formatName} from "../../utils";

interface IProps {
  message: any;
  closeModal: () => void;
}

const ModalPopUp: FC<IProps> = ({ message, closeModal }) => {
  return (
    <Modal show={!!message}>
      <Modal.Header className={`${styles.modal_header} text-white`}>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>

      <Modal.Body className={styles.modalBodyText}>{formatName(message)}</Modal.Body>

      <Modal.Footer className='justify-content-center'>
        <Button className={`btn text-white ${styles.modalCancelButton} `} variant="outline-primary" onClick={() => closeModal()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPopUp;
