import React, { FC } from 'react';
import styles from '../ModalPopUp/ModalPopUp.module.scss';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { ModalHeaderBackground, ModalMessage } from '../../interfaces/modal';

import { formatName } from '../../utils';

interface IProps {
  message: ModalMessage;
  closeModal: () => void;
}

const ModalPopUp: FC<IProps> = ({ message, closeModal }) => {
  return (
    <Modal show={!!message.content}>
      <Modal.Header
        className="text-white"
        style={
          message.headerBackground === ModalHeaderBackground.error
            ? { backgroundColor: '#de4701' }
            : { backgroundColor: '#ffc107' }
        }
      >
        <Modal.Title>{message.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body className={styles.modalBodyText}>{formatName(message.content)}</Modal.Body>

      <Modal.Footer className="justify-content-center">
        <Button
          className={`btn text-white ${styles.modalCancelButton} `}
          variant="outline-primary"
          onClick={() => closeModal()}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPopUp;
