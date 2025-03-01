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
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default MessageToast;
