import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectListAction } from '../../redux/list/listActions';
import styles from './List.module.scss';

const List = ({ dispatch, userAuth, children, list, deleteList }) => {
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

export default connect()(List);
