import React, { FC, Fragment } from 'react';
import styles from '../ModalPopUp/ModalPopUp.module.scss';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { ModalHeaderBackground, ModalMessage } from '../../interfaces/modal';

import { formatName } from '../../utils';

interface IProps {
  message: ModalMessage;
  closeModal: () => void;
  confirm?: () => void;
  redirect?: () => void;
}

const ModalPopUp: FC<IProps> = ({ message, closeModal, confirm, redirect }) => {
  const generateHeaderBackground = (type: ModalHeaderBackground | string) => {
    switch (type) {
      case ModalHeaderBackground.error:
        return { backgroundColor: '#de4701' };
      case ModalHeaderBackground.warning:
        return { backgroundColor: '#ffc107' };
      case ModalHeaderBackground.success:
        return { backgroundColor: '#28a745' };
      default:
        return { backgroundColor: 'transparent' };
    }
  };
  return (
    <Fragment>
      {message && (
        <Modal show={!!message.content}>
          <Modal.Header className="text-white" style={generateHeaderBackground(message.headerBackground ?? '')}>
            <Modal.Title>{message.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body className={styles.modalBodyText}>{formatName(message.content)}</Modal.Body>

          <Modal.Footer className="justify-content-center">
            <Button
              className={`btn text-white ${styles.modalCancelButton} `}
              variant="outline-primary"
              onClick={closeModal}
            >
              {message.closeText}
            </Button>
            {message.saveText && confirm && (
              <Button className={`btn text-white ${styles.modalOkButton} `} variant="outline-warning" onClick={confirm}>
                {message.saveText}
              </Button>
            )}
            {message.redirectPath?.pathName && redirect && (
              <Button
                className={`btn text-white ${styles.modalOkButton} `}
                variant="outline-warning"
                onClick={redirect}
              >
                {message.redirectPath?.buttonText}
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      )}
    </Fragment>
  );
};

export default ModalPopUp;
