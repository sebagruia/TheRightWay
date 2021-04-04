import React, { useState } from 'react';
import './home.css';

import { connect } from 'react-redux';

import { addListNameToFirestore, deleteListFromFirestore } from '../../firebase/firebase.utils';
import { addNewListAction, deleteListAction } from '../../redux/list/listActions';
import { formatName } from '../../utils';

import List from '../../components/List/List';

const Home = ({ dispatch, userAuth, lists }) => {
  const [listName, setListName] = useState('');

  const handleOnChange = (event) => {
    setListName(event.target.value);
  };

  const addNewList = (event) => {
    event.preventDefault();
    if (listName.length > 0) {
      const listDetails = {
        id: `${listName}${Date.now()}`,
        listName: listName,
        items: null,
      };

      if (userAuth) {
        addListNameToFirestore(userAuth.id, listName, listDetails);
      } else {
        dispatch(addNewListAction(listDetails));
      }
      setListName('');
    }
  };

  const deleteListName = (userId, listName, id) => {
    if (userId) {
      deleteListFromFirestore(userId, listName);
    } else {
      dispatch(deleteListAction(id));
    }
  };

  return (
    <div className="container">
      <div className="row addNewListInput-row">
        <div className="col">
          <div className="addNewListInput-container">
            <form onSubmit={addNewList} className="input-group addNewListInput">
              <button className="btn btn-warning plusButton" type="submit" id="button-addon1">
                +
              </button>
              <input
                onChange={handleOnChange}
                type="text"
                value={listName}
                className="form-control"
                placeholder="New List Name"
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
              />
            </form>

            <ul className="ListSummary">
              {lists &&
                Object.values(lists).map((list) => (
                  <List key={`${list.id}`} list={list} deleteList={deleteListName} userAuth={userAuth}>
                    {formatName(list.listName)}
                  </List>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userAuth: state.userReducer.user,
    lists: state.listReducer.lists,
  };
};

export default connect(mapStateToProps)(Home);
