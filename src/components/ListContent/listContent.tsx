import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './listContent.module.scss';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/hooks';
import { isGlobalLoading } from '../../redux/global/globalSelectors';
import { selectUserAuth, userError } from '../../redux/user/userSelectors';
import {
  selectListItemsOnline,
  selectListItemsForOfflineMode,
  selectSelectedList,
  selectSortType,
} from '../../redux/list/listSelectors';

import { addListItemToFirestore, fetchListsItems } from '../../firebase/firebase.utils';
import { addNewItemInList } from '../../redux/list/listActions';
import { setModalMessage } from '../../redux/user/userActions';

import { useGoogleCalendar } from '../../api/googleCalendarClient';

import ProgressBar from 'react-bootstrap/ProgressBar';

import BackArrow from '../BackArrow/BackArrow';
import Category from '../Category/Category';
import ModalPopUp from '../ModalPopUp/ModalPopUp';
import SortType from '../SortType/SortType';
import CalendarEventViewForm from '../CalendarEventViewForm/CalendarEventViewForm';
import StatsNav from '../StatsNav/StatsNav';
import StatisticsChart from '../StatisticsChart/StatisticsChart';

import { BsCalendarDay } from 'react-icons/bs';

import { ModalHeaderBackground } from '../../interfaces/modal';
import { ItemsCategory } from '../../interfaces/utilsInterfaces';
import { StatsTabsType } from '../../interfaces/statsNav';

import { formatName, itemsCategory, sortCategories } from '../../utils';

const ListContent: FC = () => {
  const dispatch = useAppDispatch();

  const userAuth = useSelector(selectUserAuth);
  const listItemsOnline = useSelector(selectListItemsOnline);
  const listItemsForOfflineMode = useSelector(selectListItemsForOfflineMode);
  const selectedList = useSelector(selectSelectedList);
  const sortType = useSelector(selectSortType);
  const error = useSelector(userError);
  const isLoading = useSelector(isGlobalLoading);

  const [inputText, setInputText] = useState('');
  const [visible, setVisible] = useState(false);
  const [eventFormVisible, setEventFormVisible] = useState(false);
  const [activeKey, setActiveKey] = useState<StatsTabsType>('progress');

  const navigate = useNavigate();

  const { addGoogleCalendarEvent } = useGoogleCalendar();

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
      dispatch(fetchListsItems(userAuth.id, selectedList.id));
    }
  }, [selectedList.id, userAuth, dispatch]);

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
    dispatch(setModalMessage({ content: '', headerBackground: ModalHeaderBackground.success }));
  };

  const redirectModal = () => {
    closeModal();
    navigate(error.redirectPath ? error.redirectPath.pathName : '/');
  };

  const toggleEventFormVisibility = () => setEventFormVisible(!eventFormVisible);

  const handleStatsNavTabSelect = (key: StatsTabsType | null) => {
    if (key) {
      setActiveKey(key);
    }
  };

  return (
    <div className={`container ${styles.containerCustom}`}>
      <ModalPopUp message={error} closeModal={closeModal} redirect={redirectModal} />
      <CalendarEventViewForm
        listName={formatName(selectedList.listName)}
        show={eventFormVisible}
        closeEventForm={toggleEventFormVisibility}
        apiCall={addGoogleCalendarEvent}
        isLoading={isLoading}
      />

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
                <BsCalendarDay
                  role="button"
                  className={`ms-5 ${styles.googleCalendar}`}
                  onClick={toggleEventFormVisibility}
                />
              </div>

              <StatsNav activeKey={activeKey} setKey={handleStatsNavTabSelect} />

              {((listItemsOnline && Object.keys(listItemsOnline).length > 0) ||
                (listItemsForOfflineMode && Object.keys(listItemsForOfflineMode).length > 0)) &&
                activeKey === 'progress' && (
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
              {activeKey === 'statistics' && <StatisticsChart />}
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

export default ListContent;
