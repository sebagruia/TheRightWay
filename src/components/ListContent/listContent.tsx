import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import styles from './ListContent.module.scss';

import { connect, useDispatch } from 'react-redux';
import { stateMapping } from '../../redux/stateMapping';

import { addListItemToFirestore } from '../../firebase/firebase.utils';
import { addNewItemInList } from '../../redux/list/listActions';

import ProgressBar from 'react-bootstrap/ProgressBar';

import BackArrow from '../BackArrow/BackArrow';
import Category from '../Category/Category';
import SortType from '../SortType/SortType';

import { List, Lists } from '../../interfaces/list';

import { FoodCategory } from '../../interfaces/utilsInterfaces';
import { foodCategories, formatName, sortCategories } from '../../utils';

interface IProps {
  userAuth: any;
  lists: Lists;
  selectedList: List;
  sortType: string | null;
}

const ListContent: FC<IProps> = ({ userAuth, lists, selectedList, sortType }) => {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState('');
  const [visible, setVisible] = useState(false);
  const listItems = lists[selectedList.id].items;
  const checkedItems = listItems && Object.values(listItems).filter((list) => list.check === true).length;
  const percentage = listItems && Math.floor((checkedItems / Object.values(listItems).length) * 100);

  const handleClick = () => {
    setVisible(!visible);
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const addNewItem = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputText.length > 0) {
      const item = {
        id: Math.floor(Math.random() * Date.now()).toString(),
        itemName: inputText,
        check: false,
        quantity: '1',
        unit: '',
        category: '',
        note: '',
      };
      if (userAuth) {
        addListItemToFirestore(userAuth.id, selectedList.id, item);
      } else {
        dispatch(addNewItemInList(selectedList.id, item));
      }
      setInputText('');
    }
  };

  useEffect(() => {
    if (sortType === 'sortByCategory') {
    }
  }, [sortType]);

  return (
    <div className="container">
      <div className={`row ${styles.listContent_row}`}>
        <div className="col">
          <div className={styles.listContent_container}>
            <BackArrow route="/home" />

            <div className={styles.titleContainer}>
              <div className={styles.addItemButtontAndTitle}>
                <h1 className="m-0">
                  <span className={styles.bold}>{formatName(selectedList.listName)}</span>{' '}
                </h1>
                <div className={`${styles.buttonContainer} ${visible ? 'hide' : 'reveal'}`}>
                  <button
                    onClick={handleClick}
                    className={`btn btn-warning ${styles.addButton} `}
                    type="submit"
                    id="button-addon1"
                  >
                    <span className={styles.buttonSign}>+</span>
                  </button>
                </div>
                {listItems && Object.keys(listItems).length > 1 && <SortType />}
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
              <form
                onSubmit={addNewItem}
                className={`input-group ${styles.addNewItemInput} ${visible ? 'reveal' : 'hide'}`}
              >
                <div className={styles.inputGroup}>
                  <input
                    onChange={handleOnChange}
                    type="text"
                    value={inputText}
                    className={`form-control ${styles.form_control}`}
                    placeholder="New Item Name"
                    aria-label="new item"
                    aria-describedby="new item"
                  />
                  <button
                    onClick={handleClick}
                    className={`btn btn-warning ${styles.inputAddButton} `}
                    type="submit"
                    id="inputAddButton"
                  >
                    +
                  </button>
                </div>
              </form>
              {sortType === 'sortByCategory'
                ? foodCategories
                    .sort(sortCategories)
                    .map((category: FoodCategory) => <Category categoryName={category.name} key={category.id} />)
                : foodCategories.map((category: FoodCategory) => (
                    <Category categoryName={category.name} key={category.id} />
                  ))}
            </div>
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
    selectedList: sm.selectedList,
    sortType: sm.sortType,
  };
};

export default connect(mapStateToProps)(ListContent);
