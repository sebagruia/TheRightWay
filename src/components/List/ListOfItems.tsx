import React, { Dispatch, FC, ReactNode } from 'react';
import styles from './ListOfItems.module.scss';

import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectListAction } from '../../redux/list/listActions';

import { List, ListAction } from '../../interfaces/list';

interface IProps {
  dispatch: Dispatch<ListAction>;
  children: ReactNode;
  userAuth: any;
  list: List;
  deleteList: (userId: string, listId: string) => void;
}

const ListOfItems: FC<IProps> = ({ dispatch, userAuth, children, list, deleteList }) => {
  const navigate = useNavigate();

  return (
    <li className={styles.newListLi}>
      <button
        onClick={() => {
          dispatch(selectListAction(list));
          navigate('/listContent');
        }}
        type="button"
        className="btn btn-outline-warning btn-lg btn-block capitalize button-color-orange"
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

export default connect()(ListOfItems);
