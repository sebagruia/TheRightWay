import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import styles from './home.module.scss';

import { connect, useDispatch } from 'react-redux';
import { stateMapping } from '../../redux/stateMapping';

import { addListNameToFirestore, deleteListFromFirestore } from '../../firebase/firebase.utils';
import { addNewListAction,  deleteListAction} from '../../redux/list/listActions';
import {setModalMessage} from '../../redux/user/userActions';

import ListOfItems from '../ListOfItems/ListOfItems';
import ModalPopUp from '../ModalPopUp/ModalPopUp';

import { Lists } from '../../interfaces/list';
import { ModalMessage} from '../../interfaces/modal';

import { formatName } from '../../utils';

interface IProps {
  userAuth: any;
  lists: Lists;
  error: ModalMessage;
}

const Home: FC<IProps> = ({ userAuth, lists, error }) => {
  const dispatch = useDispatch();
  const [listName, setListName] = useState('');
  const [visible, setVisible] = useState(true);

  const handleClick = () => {
    setVisible(!visible);
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setListName(event.target.value);
  };

  const addNewList = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (listName.length > 0) {
      const listDetails = {
        id: formatName(listName),
        listName: listName,
      };
      if (userAuth) {
        addListNameToFirestore(userAuth.id, listDetails.id, listDetails, dispatch);
      } else {
        dispatch(addNewListAction(listDetails));
      }
      setListName('');
    }
  };

  const deleteListName = (userId: string, listId: string) => {
    if (userId) {
      deleteListFromFirestore(userId, listId);
    } else {
      dispatch(deleteListAction(listId));
    }
  };
  const closeModal = () => {
    dispatch(setModalMessage({content:""}));
  };

  return (
    <div className="container">
      <ModalPopUp message={error} closeModal={closeModal} />
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
                  <ListOfItems key={`${list.id}`} list={list} deleteList={deleteListName} userAuth={userAuth}>
                    {formatName(list.listName)}
                  </ListOfItems>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const sm = stateMapping(state);
  return {
    userAuth: sm.userAuth,
    lists: sm.lists,
    error: sm.userError,
  };
};

export default connect(mapStateToProps)(Home);
