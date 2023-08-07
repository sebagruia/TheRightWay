import React, { FC, Fragment, useState } from 'react';
import styles from './Category.module.scss';

import { connect } from 'react-redux';
import { stateMapping } from '../../redux/stateMapping';

import ListItem from '../ListItem/ListItem';

import { List, Lists } from '../../interfaces/list';

import { TbArrowBadgeDown, TbArrowBadgeRight } from 'react-icons/tb';

interface IProps {
  lists: Lists;
  selectedList: List;
  sortType: string | null;
  categoryName: string;
}

const Category: FC<IProps> = ({ lists, selectedList, sortType, categoryName }) => {
  const [unfold, setUnfold] = useState(false);
  const listItemsInCategory = Object.values(lists[selectedList.id].items).filter(
    (item) => item.category === categoryName
  );
  const handleClick = () => {
    setUnfold(!unfold);
  };

  const generateListItemsInCategory = () => {
    switch (sortType) {
      case 'sortAscending':
        return listItemsInCategory
          .sort((a, b) => {
            return parseInt(a.id) - parseInt(b.id);
          })
          .map((item) => {
            return <ListItem key={item.id} item={item} />;
          });
      case 'sortDescending':
        return listItemsInCategory
          .sort((a, b) => {
            return parseInt(b.id) - parseInt(a.id);
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
      {listItemsInCategory.length > 0 && (
        <ul className={styles.todo_list}>
          <div
            onClick={handleClick}
            className={`${styles.categoryTitleContainer} d-flex align-items-center justify-content-between px-3 mb-3`}
          >
            <p className={`${styles.categoryTitle} p-text m-0 py-1`}>
              {categoryName === '' ? 'Categorie' : categoryName}
            </p>
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
