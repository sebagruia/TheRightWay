import React, { FC, Fragment, useState } from 'react';
import styles from './Category.module.scss';

import { connect } from 'react-redux';
import { stateMapping } from '../../redux/stateMapping';

import ListItem from '../ListItem/ListItem';

import { Items, ItemsOfflineMode } from '../../interfaces/item';
import { List, Lists } from '../../interfaces/list';

import { TbArrowBadgeDown, TbArrowBadgeRight } from 'react-icons/tb';

interface IProps {
  lists: Lists;
  listItemsOnline: Items;
  listItemsForOfflineMode: ItemsOfflineMode;
  selectedList: List;
  sortType: string | null;
  categoryName: string;
}

const Category: FC<IProps> = ({ listItemsOnline, listItemsForOfflineMode, selectedList, sortType, categoryName }) => {
  const [unfold, setUnfold] = useState(false);
  const listItemsInCategory =
    listItemsOnline && Object.values(listItemsOnline).length
      ? Object.values(listItemsOnline).filter((item) => item.category === categoryName)
      : listItemsForOfflineMode && Object.values(listItemsForOfflineMode).length
        ? listItemsForOfflineMode[selectedList.id] &&
          Object.values(listItemsForOfflineMode[selectedList.id]).filter((item) => item.category === categoryName)
        : [];

  const handleClick = () => {
    setUnfold(!unfold);
  };
  const generateListItemsInCategory = () => {
    switch (sortType) {
      case 'sortAscending':
        return listItemsInCategory.sort().map((item) => {
          return <ListItem key={item.id} item={item} />;
        });
      case 'sortDescending':
        return listItemsInCategory
          .sort((a, b) => {
            if (a.itemName.toLowerCase() > b.itemName.toLowerCase()) {
              return -1;
            }
            if (a.itemName.toLowerCase() < b.itemName.toLowerCase()) {
              return 1;
            }
            return 0;
          })
          .map((item) => {
            return <ListItem key={item.id} item={item} />;
          });
      default:
        return listItemsInCategory.map((item) => {
          return <ListItem key={item.id} item={item} />;
        });
    }
  };

  return (
    <Fragment>
      {listItemsInCategory && listItemsInCategory.length > 0 && (
        <ul className={styles.todo_list}>
          <div
            onClick={handleClick}
            className={`${styles.categoryTitleContainer} d-flex align-items-center justify-content-between px-3 mb-3`}
          >
            <p className={`${styles.categoryTitle} p-text m-0 py-1`}>{categoryName}</p>
            {!unfold ? <TbArrowBadgeRight size="20px" /> : <TbArrowBadgeDown size="20px" />}
          </div>
          <div className={`${unfold ? 'reveal' : 'hide'} px-3`}>
            <div style={unfold ? { display: 'initial' } : { display: 'none' }}>{generateListItemsInCategory()}</div>
          </div>
        </ul>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state: any) => {
  const sm = stateMapping(state);
  return {
    lists: sm.lists,
    selectedList: sm.selectedList,
    sortType: sm.sortType,
  };
};

export default connect(mapStateToProps)(Category);
