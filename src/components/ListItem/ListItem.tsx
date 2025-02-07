import React, { FC } from 'react';
import styles from './ListItem.module.scss';

import { useNavigate } from 'react-router-dom';

import { connect, useDispatch } from 'react-redux';
import { deleteListItem, selectingCurrentItem, editItem } from '../../redux/list/listActions';
import { stateMapping } from '../../redux/stateMapping';

import { deleteListItemFromFirestore, updatingListItemToFirestore } from '../../firebase/firebase.utils';

import { CiTrash } from 'react-icons/ci';
import { IoEllipsisVerticalOutline } from 'react-icons/io5';
import { MdKeyboardArrowRight } from 'react-icons/md';

import { Item } from '../../interfaces/item';
import { List } from '../../interfaces/list';

import { formatName } from '../../utils';
interface IProps {
  userAuth: any;
  item: Item;
  selectedList: List;
}

const ListItem: FC<IProps> = ({ userAuth, item, selectedList }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, check, quantity, unit } = item;

  const deleteItem = (listId: string, itemID: string) => {
    if (userAuth) {
      deleteListItemFromFirestore(userAuth.id, listId, itemID);
    } else {
      dispatch(deleteListItem(listId, itemID));
    }
  };

  const selectItemForEdit = (item: Item) => {
    dispatch(selectingCurrentItem(item));
    navigate(`/editItem/${id}`);
  };

  const updateItemCheckStatus = (selectedList: List, status: boolean, item: Item ) => {
    if (userAuth && item) {
      updatingListItemToFirestore(userAuth.id, selectedList.id,{ ...item, check:!status});
    } else {
      dispatch(editItem(selectedList.id, { ...item, check:!status}));
    }
  };

  return (
    <li className="li-item">
      <div className={`${styles.list_component} text-secondary`}>
        <div className={styles.check_list}>
          <i
            className={`far pe-1 ${check ? 'fa-check-circle text-success' : 'fa-circle'} ${
              styles.fa_check_circle_custom
            }`}
            role="button"
            onClick={() => updateItemCheckStatus(selectedList, check, item)}
            aria-hidden="true"
          ></i>
          <p className="p-text" style={check ? { textDecoration: 'line-through' } : { textDecoration: 'initial' }}>
            {formatName(id)}
          </p>
        </div>
        <div className={styles.edit_list}>
          <p className={`m-0 pt-1 ${styles.quantity}`}>{`${quantity} ${unit}`}</p>
          <IoEllipsisVerticalOutline />
          <CiTrash
            className={`${styles.garbage} fas fa-regular fa-trash pe-1`}
            role="button"
            size="24px"
            onClick={() => deleteItem(selectedList.id, id)}
            aria-hidden="true"
          />
          <MdKeyboardArrowRight
            className={`${styles.edit}`}
            role="button"
            size="28px"
            onClick={() => selectItemForEdit(item)}
            aria-hidden="true"
          />
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
