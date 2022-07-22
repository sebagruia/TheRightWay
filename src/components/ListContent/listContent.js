import React, { useState } from 'react';
import styles from './listContent.module.scss';

import { connect } from 'react-redux';

import { addListItemToFirestore } from '../../firebase/firebase.utils';
import { addNewItemInList } from '../../redux/list/listActions';

import Item from '../../components/Item/Item';
import ProgressBar from 'react-bootstrap/ProgressBar';

import backArrow from '../../assets/iconmonstr-arrow-15-32.png';

const ListContent = ({ dispatch, userAuth, lists, selectedList }) => {
  const [inputText, setInputText] = useState('');
  const [visible, setVisible] = useState(true);
  const listItems = lists[selectedList.id].items;
  const checkedItems = listItems && Object.values(listItems).filter((list) => list.check === true).length;
  const percentage = listItems && Math.floor((checkedItems / Object.values(listItems).length) * 100);

  const handleClick = () => {
    setVisible(!visible);
  };

  const handleOnChange = (event) => {
    setInputText(event.target.value);
  };

  const addNewItem = (event) => {
    event.preventDefault();
    if (inputText.length > 0) {
      const item = {
        id: `${inputText}${Date.now()}`,
        itemName: inputText,
        check: false,
        quantity: '1',
      };
      if (userAuth) {
        addListItemToFirestore(userAuth.id, selectedList.id, item);
      } else {
        dispatch(addNewItemInList(selectedList.id, item));
      }
      setInputText('');
    }
  };
  return (
    <div className="container">
      <div className={`row ${styles.listContent_row}`}>
        <div className="col">
          <div className={styles.listContent_container}>
            <img src={backArrow} alt="back arrow" className={styles.backArrow} />
            <div className={styles.titleContainer}>
              <h1>
                <span className={styles.bold}>{selectedList.listName.toUpperCase()}</span>{' '}
              </h1>
              {listItems && (
                <div className={styles.progressContainer}>
                  <ProgressBar
                    animated
                    variant="warning"
                    now={percentage}
                    label={`${!isNaN(percentage) ? percentage : 0}%`}
                  />
                  <p>{`${checkedItems} of ${Object.values(listItems).length} tasks`}</p>
                </div>
              )}
            </div>
            <form onSubmit={addNewItem} className={`input-group ${styles.addNewItemInput}`}>
              {visible ? (
                <button onClick={handleClick} className={`btn btn-warning ${styles.plusButton} `} type="button">
                  +
                </button>
              ) : null}

              <div className={`${styles.inputGroup}  ${!visible ? `reveal` : `hide`}`}>
                <input
                  onChange={handleOnChange}
                  type="text"
                  value={inputText}
                  className={`form-control ${styles.form_control}`}
                  placeholder="New Item Name"
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
            <ul className={styles.todo_list}>
              {listItems && Object.values(listItems).map((item) => <Item key={item.id} item={item} />)}
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
    selectedList: state.listReducer.selectedList,
  };
};

export default connect(mapStateToProps)(ListContent);
