import React, { FC, ReactNode } from 'react';
import styles from './ListOfItems.module.scss';

import { useNavigate } from 'react-router-dom';

import {useDispatch } from 'react-redux';
import { selectListAction } from '../../redux/list/listActions';

import { List } from '../../interfaces/list';

interface IProps {
  children: ReactNode;
  userAuth: any;
  list: List;
  deleteList: (userId: string, listId: string) => void;
}

const ListOfItems: FC<IProps> = ({ userAuth, children, list, deleteList }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <li className={styles.newListLi}>
      <button
        onClick={() => {
          dispatch(selectListAction(list));
          navigate('/listContent');
        }}
        type="button"
        className={`btn btn-outline-warning btn-lg btn-block capitalize button-color-orange ${styles.btn_custom}`}
      >
        {children}
      </button>
      <i
        onClick={() => deleteList(userAuth && userAuth.id, list.id)}
        className={`far fa-times-circle  ${styles.fa_times_circle}`}
        role="button"
        aria-hidden="true"
      ></i>
    </li>
  );
};

export default ListOfItems;
