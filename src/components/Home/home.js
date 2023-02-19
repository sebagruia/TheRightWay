import React, { useState } from 'react';
import styles from './home.module.scss';

import { connect } from 'react-redux';

import { addListNameToFirestore, deleteListFromFirestore } from '../../firebase/firebase.utils';
import { addNewListAction, deleteListAction } from '../../redux/list/listActions';
import { formatName } from '../../utils';

import List from '../../components/List/List';

const Home = ({ dispatch, userAuth, lists }) => {
  const [listName, setListName] = useState('');
  const [visible, setVisible] = useState(true);

  const handleClick = () => {
    setVisible(!visible);
  };

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
        addListNameToFirestore(userAuth.id, listDetails.id, listDetails);
      } else {
        dispatch(addNewListAction(listDetails));
      }
      setListName('');
    }
  };

  const deleteListName = (userId, listId) => {
    if (userId) {
      deleteListFromFirestore(userId, listId);
    } else {
      dispatch(deleteListAction(listId));
    }
  };

  return (
    <div className="container">
      <div className={`row ${styles.addNewListInput_row}`}>
        <div className="col">
          <div className={styles.addNewListInput_container}>
            <div className={styles.titleContainer}>
              <div className={styles.h1container}>
                <h1>
                  <span className={styles.bold}>Task</span> <span className={styles.light}></span>Lists
                </h1>
              </div>
              <hr />
            </div>
            <form onSubmit={addNewList} className={`input-group ${styles.addNewListInput}`}>
              {visible ? (
                <button onClick={handleClick} className={`btn btn-warning ${styles.plusButton}`} type="submit">
                  +
                </button>
              ) : null}
              <div className={`${styles.inputGroup} ${!visible ? `reveal` : `hide`}`}>
                <input
                  onChange={handleOnChange}
                  type="text"
                  value={listName}
                  className={`form-control ${styles.form_control}`}
                  placeholder="New List Name"
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                />
                <button
                  onClick={handleClick}
                  className={`btn btn-warning ${styles.addButton} `}
                  type="submit"
                  id="button-addon1"
                >
                  +
                </button>
              </div>
            </form>

            <ul className={styles.listSummary}>
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
