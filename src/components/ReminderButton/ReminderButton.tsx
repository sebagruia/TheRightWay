import React, { FC, Fragment, ReactNode, useState } from 'react';
import styles from './ReminderButton.module.scss';

import ModalPopUp from '../ModalPopUp/ModalPopUp';

import { IoEllipsisHorizontalOutline } from 'react-icons/io5';

interface IProps {
  children: ReactNode;
}

const ReminderButton: FC<IProps> = ({ children }) => {
  const [deleteReminder, setDeleteReminder] = useState({ content: '' });

  const closeModal = () => {
    setDeleteReminder({ content: '' });
  };

  const confirmDeletion = () => {
    setDeleteReminder({ content: '' });
  };

  const openModal = () => {
    setDeleteReminder({ content: 'Are you Sure?' });
  };

  return (
    <Fragment>
      <ModalPopUp
        message={deleteReminder}
        closeModal={closeModal}
        confirm={confirmDeletion}
        closeText="Cancel"
        saveText="Ok"
      />
      <li className={styles.newReminder}>
        <button
          onClick={() => {}}
          type="button"
          className={`btn btn-outline-warning btn-lg btn-block capitalize button-color-orange ${styles.btn_custom}`}
        >
          {children}
          <div className={styles.elipsis}>
            <IoEllipsisHorizontalOutline />
          </div>
        </button>
        <i
          onClick={openModal}
          className={`far fa-times-circle  ${styles.fa_times_circle}`}
          role="button"
          aria-hidden="true"
        ></i>
      </li>
    </Fragment>
  );
};

export default ReminderButton;
