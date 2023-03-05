import React, { useState } from 'react';
import styles from './listContent.module.scss';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { addListItemToFirestore } from '../../firebase/firebase.utils';
import { addNewItemInList } from '../../redux/list/listActions';

import ProgressBar from 'react-bootstrap/ProgressBar';
import Item from '../../components/Item/Item';

import backArrow from '../../assets/images/iconmonstr-arrow-59-48.png';
import ascendingIcon from '../../assets/svg/sortAsc.svg';
import descendingIcon from '../../assets/svg/sortDesc.svg';

import { formatName, sortDescending } from '../../utils';

const ListContent = ({ dispatch, userAuth, lists, selectedList }) => {
  const [inputText, setInputText] = useState('');
  const [visible, setVisible] = useState(true);
  const [sort, setSort] = useState(true);
  const listItems = lists[selectedList.id].items;
  const checkedItems = listItems && Object.values(listItems).filter((list) => list.check === true).length;
  const percentage = listItems && Math.floor((checkedItems / Object.values(listItems).length) * 100);

  const handleClick = () => {
    setVisible(!visible);
  };

  const handleOnChange = (event) => {
    setInputText(event.target.value);
  };
  const handleSort = () => {
    setSort(!sort);
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
            <Link to="/home" className="backArrow">
              <img src={backArrow} alt="back arrow" />
            </Link>

            <div className={styles.titleContainer}>
              <div className={styles.addItemButtontAndTitle}>
                <h1 className="m-0">
                  <span className={styles.bold}>{formatName(selectedList.listName)}</span>{' '}
                </h1>
                <div className={styles.buttonContainer}>
                  <button
                    onClick={handleClick}
                    className={`btn btn-warning ${styles.addButton} `}
                    type="submit"
                    id="button-addon1"
                  >
                    <span className={styles.buttonSign}>+</span>
                  </button>
                </div>
                {listItems && Object.keys(listItems).length > 1 && (
                  <div className={styles.sortContainer} onClick={handleSort}>
                    {sort ? (
                      <img src={ascendingIcon} alt="ascendingIcon" />
                    ) : (
                      <img src={descendingIcon} alt="descendingIcon" />
                    )}
                  </div>
                )}
              </div>

              {listItems && Object.keys(listItems).length > 0 && (
                <div className={styles.progressContainer}>
                  <ProgressBar
                    animated
                    variant="warning"
                    now={percentage}
                    label={`${!isNaN(percentage) ? percentage : 0}%`}
                  />
                  <p>{`${checkedItems} of ${Object.keys(listItems).length} tasks`}</p>
                </div>
              )}
            </div>
            <div className={styles.addNewItemInput_container}>
              <form onSubmit={addNewItem} className={`input-group ${styles.addNewItemInput}`}>
                <div className={styles.inputGroup}>
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
              {listItems && Object.keys(listItems).length > 0 && (
                <ul className={styles.todo_list}>
                  {!sort
                    ? Object.keys(listItems)
                        .sort(sortDescending)
                        .map((itemKey) => {
                          return <Item key={listItems[itemKey].id} item={listItems[itemKey]} />;
                        })
                    : Object.keys(listItems)
                        .sort()
                        .map((itemKey) => {
                          console.log(itemKey);
                          return <Item key={listItems[itemKey].id} item={listItems[itemKey]} />;
                        })}
                </ul>
              )}
            </div>
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
