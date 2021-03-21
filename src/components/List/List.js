import React from 'react';
import './List.css';

import { connect } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { selectingCurrentList } from '../../redux/list/listActions';

const List = ({ dispatch, userAuth, children, list, deleteList }) => {
  const history = useHistory();

  const { id, listName } = list;

  return (
    <li className="newListLi">
      <button
        onClick={() => {
          dispatch(selectingCurrentList({ listId: id, listName: listName }));
          history.push('/listContent');
        }}
        type="button"
        className="btn btn-outline-warning btn-lg btn-block capitalize button-color-orange"
      >
        {children}
      </button>
      <i
        onClick={() => deleteList(userAuth.id, listName, id)}
        className="far fa-trash-alt"
        role="button"
        aria-hidden="true"
      ></i>
    </li>
  );
};

export default connect()(List);
