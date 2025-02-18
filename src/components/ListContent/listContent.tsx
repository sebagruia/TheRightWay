import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import styles from './listContent.module.scss';

import { connect, useDispatch } from 'react-redux';
import { stateMapping } from '../../redux/stateMapping';

import { addListItemToFirestore, fetchListsItems } from '../../firebase/firebase.utils';
import { addNewItemInList } from '../../redux/list/listActions';
import { setModalMessage } from '../../redux/user/userActions';

import ProgressBar from 'react-bootstrap/ProgressBar';

import BackArrow from '../BackArrow/BackArrow';
import Category from '../Category/Category';
import ModalPopUp from '../ModalPopUp/ModalPopUp';
import SortType from '../SortType/SortType';

import { Items, ItemsOfflineMode } from '../../interfaces/item';
import { List, Lists } from '../../interfaces/list';
import { ModalMessage } from '../../interfaces/modal';
import { ItemsCategory } from '../../interfaces/utilsInterfaces';

import { formatName, itemsCategory, sortCategories } from '../../utils';

interface IProps {
  userAuth: any;
  lists: Lists;
  listItemsForOfflineMode: ItemsOfflineMode;
  listItemsOnline: Items;
  selectedList: List;
  sortType: string | null;
  error: ModalMessage;
  getListItems: (userId: string, listId: string) => any;
}

const ListContent: FC<IProps> = ({
  userAuth,
  listItemsOnline,
  listItemsForOfflineMode,
  selectedList,
  sortType,
  error,
  getListItems,
}) => {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState('');
  const [visible, setVisible] = useState(false);

  const checkedItems = () => {
    if (listItemsOnline && Object.values(listItemsOnline).length) {
      return Object.values(listItemsOnline).filter((list) => list.check === true).length;
    } else if (
      listItemsForOfflineMode &&
      Object.values(listItemsForOfflineMode).length &&
      listItemsForOfflineMode[selectedList.id]
    ) {
      return Object.values(listItemsForOfflineMode[selectedList.id]).filter((list) => list.check === true).length;
    } else {
      return 0;
    }
  };

  const percentage = () => {
    if (listItemsOnline && Object.values(listItemsOnline).length) {
      return listItemsOnline && Math.floor((checkedItems() / Object.values(listItemsOnline).length) * 100);
    } else if (
      listItemsForOfflineMode &&
      Object.values(listItemsForOfflineMode).length &&
      listItemsForOfflineMode[selectedList.id]
    ) {
      return Math.floor((checkedItems() / Object.values(listItemsForOfflineMode[selectedList.id]).length) * 100);
    } else {
      return 0;
    }
  };

  useEffect(() => {
    if (userAuth) {
      getListItems(userAuth.id, selectedList.id);
    }
  }, [selectedList.id, userAuth]);

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
        id: formatName(inputText),
        itemName: inputText,
        check: false,
        quantity: '1',
        unit: '',
        category: 'Generale',
        note: '',
      };
      if (userAuth) {
        addListItemToFirestore(userAuth.id, selectedList.id, item, dispatch);
      } else {
        dispatch(addNewItemInList(selectedList.id, item));
      }
      setInputText('');
    }
  };

  const closeModal = () => {
    dispatch(setModalMessage({ content: '' }));
  };

  return (
    <div className={`container ${styles.containerCustom}`}>
      <ModalPopUp message={error} closeModal={closeModal} closeText="Close" />

      <div className={`row ${styles.listContent_row}`}>
        <div className="col">
          <div className={styles.listContent_container}>
            <BackArrow route="/lists" />

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
                {((listItemsOnline && Object.keys(listItemsOnline).length > 1) ||
                  (listItemsForOfflineMode && Object.keys(listItemsForOfflineMode).length > 1)) && <SortType />}
              </div>

              {((listItemsOnline && Object.keys(listItemsOnline).length > 0) ||
                (listItemsForOfflineMode && Object.keys(listItemsForOfflineMode).length > 0)) && (
                <div className={styles.progressContainer}>
                  <ProgressBar
                    animated
                    variant="warning"
                    now={percentage()}
                    label={`${!isNaN(percentage()) ? percentage() : 0}%`}
                  />
                  <p>{`${checkedItems()} of ${
                    Object.keys(
                      userAuth
                        ? listItemsOnline
                        : listItemsForOfflineMode[selectedList.id]
                          ? listItemsForOfflineMode[selectedList.id]
                          : {},
                    ).length
                  } tasks`}</p>
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
              <div className={styles.categorieList_container}>
                {sortType === 'sortByCategory'
                  ? itemsCategory
                      .sort(sortCategories)
                      .map((category: ItemsCategory) => (
                        <Category
                          categoryName={category.name}
                          listItemsOnline={listItemsOnline}
                          listItemsForOfflineMode={listItemsForOfflineMode}
                          key={category.id}
                        />
                      ))
                  : itemsCategory.map((category: ItemsCategory) => (
                      <Category
                        categoryName={category.name}
                        listItemsOnline={listItemsOnline}
                        listItemsForOfflineMode={listItemsForOfflineMode}
                        key={category.id}
                      />
                    ))}
              </div>
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
    listItemsOnline: sm.listItemsOnline,
    listItemsForOfflineMode: sm.listItemsForOfflineMode,
    selectedList: sm.selectedList,
    sortType: sm.sortType,
    error: sm.userError,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  getListItems: (userId: string, listId: string) => dispatch(fetchListsItems(userId, listId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListContent);
