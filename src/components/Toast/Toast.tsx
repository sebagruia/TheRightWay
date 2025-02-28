import React, { FC } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import { ToastPosition } from '../../enums/messageToast';

interface IProps {
  message: string;
  show: boolean;
  position: ToastPosition;
  title: string;
  toggleShow: () => void;
}

const MessageToast: FC<IProps> = ({ message, show, position, toggleShow, title }) => {
  return (
    <ToastContainer className="p-3" position={position} style={{ zIndex: 1 }}>
      <Toast show={show} onClose={toggleShow} bg="light">
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body className="ms-2">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default MessageToast;
