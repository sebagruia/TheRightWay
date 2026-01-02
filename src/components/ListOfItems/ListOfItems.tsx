import React, { FC, Fragment, ReactNode, useEffect, useState } from 'react';
import styles from './ListOfItems.module.scss';

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { selectListAction } from '../../redux/list/listActions';

import ModalPopUp from '../ModalPopUp/ModalPopUp';

import { List } from '../../interfaces/list';
import { ModalHeaderBackground, ModalMessage } from '../../interfaces/modal';

interface IProps {
  children: ReactNode;
  userAuth: any;
  list: List;
  deleteList: (userId: string, listId: string) => void;
}

const ListOfItems: FC<IProps> = ({ userAuth, children, list, deleteList }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState<ModalMessage>({ content: '' });

  const closeModal = () => {
    setDeleteMessage({ content: '' });
  };

  const openModal = () => {
    setDeleteMessage({
      content: 'Are you Sure?',
      headerBackground: ModalHeaderBackground.warning,
      closeText: 'Cancel',
      saveText: 'Ok',
    });
  };

  const confirmDeletion = () => {
    setDeleteMessage({ content: '' });
    setDeleteConfirmation(true);
  };

  useEffect(() => {
    if (deleteConfirmation) {
      deleteList(userAuth && userAuth.id, list.id);
    }
  }, [deleteConfirmation]);

  return (
    <Fragment>
      <ModalPopUp message={deleteMessage} closeModal={closeModal} confirm={confirmDeletion} />
      <li className={styles.newListLi}>
        <button
          onClick={() => {
            dispatch(selectListAction(list));
            navigate(`/lists/${list.id}`);
          }}
          type="button"
          className={`btn btn-outline-warning btn-lg btn-block capitalize button-color-orange ${styles.btn_custom}`}
        >
          {children}
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

export default ListOfItems;
