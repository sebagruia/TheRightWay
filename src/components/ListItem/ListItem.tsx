import React, { Dispatch, FC } from 'react';
import styles from './ListItem.module.scss';

import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import { deleteListItem, selectingCurrentItem, toggleCheckStatus } from '../../redux/list/listActions';
import { stateMapping } from '../../redux/stateMapping';

import { deleteListItemFromFirestore, toggleCheckInFirestore } from '../../firebase/firebase.utils';

import { Item } from '../../interfaces/item';
import { List, ListAction } from '../../interfaces/list';

import { formatName } from '../../utils';

interface IProps {
  dispatch: Dispatch<ListAction>;
  userAuth: any;
  item: Item;
  selectedList: List;
}

const ListItem: FC<IProps> = ({ dispatch, userAuth, item, selectedList }) => {
  const navigate = useNavigate();
  const { itemName, id, check } = item;

  const deleteItem = (listId: string, itemID: string) => {
    if (userAuth) {
      deleteListItemFromFirestore(userAuth.id, listId, itemID);
    } else {
      dispatch(deleteListItem(listId, itemID));
    }
  };

  const editItem = (item: Item) => {
    dispatch(selectingCurrentItem(item));
    navigate('/editItem');
  };

  const toggleCheck = (selectedList: List, status: boolean, item: Item) => {
    if (userAuth) {
      toggleCheckInFirestore(userAuth.id, selectedList.id, item);
    } else {
      dispatch(toggleCheckStatus(selectedList.id, item.id, !status));
    }
  };

  return (
    <li className="li-item">
      <div className={`${styles.list_component} text-secondary`}>
        <div className={styles.check_list}>
          <i
            className={`far pr-1 ${check ? 'fa-check-circle text-success' : 'fa-circle'} ${
              styles.fa_check_circle_custom
            }`}
            role="button"
            onClick={() => toggleCheck(selectedList, check, item)}
            aria-hidden="true"
          ></i>
          <p className="p-text" style={check ? { textDecoration: 'line-through' } : { textDecoration: 'initial' }}>
            {formatName(itemName)}
          </p>
        </div>
        <div className={styles.edit_list}>
          <i
            className={`${styles.garbage} fas fa-regular fa-trash pr-1`}
            role="button"
            onClick={() => deleteItem(selectedList.id, id)}
            aria-hidden="true"
          ></i>
          <i
            className={`${styles.edit} fas fa-solid fa-circle-chevron-right`}
            role="button"
            onClick={() => editItem(item)}
            aria-hidden="true"
          ></i>
        </div>
      </div>
    </li>
  );
};

const mapStateToProps = (state: any) => {
  const sm = stateMapping(state);
  return {
    userAuth: sm.userAuth,
    selectedList: sm.selectedList,
  };
};

export default connect(mapStateToProps)(ListItem);
