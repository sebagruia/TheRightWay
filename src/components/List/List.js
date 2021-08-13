import React from 'react';
import styles from './List.module.scss';
import { connect } from 'react-redux';
import { selectListAction } from '../../redux/list/listActions';
import { useHistory } from 'react-router-dom';

const List = ({ dispatch, userAuth, children, list, deleteList }) => {
  const history = useHistory();

  return (
    <li className={styles.newListLi}>
      <button
        onClick={() => {
          dispatch(selectListAction(list));
          history.push('/listContent');
        }}
        type="button"
        className="btn btn-outline-warning btn-lg btn-block capitalize button-color-orange"
      >
        {children}
      </button>
      <i
        onClick={() => deleteList(userAuth && userAuth.id, list.id)}
        className={`far fa-times-circle ${styles.fa_times_circle}`}
        role="button"
        aria-hidden="true"
      ></i>
    </li>
  );
};

export default connect()(List);
