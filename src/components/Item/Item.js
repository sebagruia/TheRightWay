import React, { Fragment, useState } from 'react';
import styles from './Item.module.scss';

import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';

import {
  changeQuantityInFirestore,
  deleteListItemFromFirestore,
  toggleCheckInFirestore,
} from '../../firebase/firebase.utils';
import {
  changeItemQuantity,
  deleteListItem,
  selectingCurrentItem,
  toggleCheckStatus,
} from '../../redux/list/listActions';

import Modalpopup from '../../components/Modalpopup/Modalpopup';

const Item = ({ dispatch, userAuth, item, selectedList, lists }) => {
  const navigate = useNavigate();
  console.log(item);
  const { itemName, id, check } = item;
  const quantityValue = lists[selectedList.id].items[id].quantity;

  const [quantity, setQuantity] = useState(quantityValue || 1);
  const [show, setShow] = useState(false);

  const onChangeQuantity = (event) => {
    if (event.target.value === '') {
      setQuantity(1);
      changeQuantity(selectedList.id, id, event.target.value);
    } else {
      setQuantity(event.target.value);
      changeQuantity(selectedList.id, id, event.target.value);
    }
  };

  const deleteItem = (listId, itemID) => {
    if (userAuth) {
      deleteListItemFromFirestore(userAuth.id, listId, itemID);
    } else {
      dispatch(deleteListItem(listId, itemID));
    }
  };

  const handleShowModal = (itemId) => {
    setShow(!show);
    dispatch(selectingCurrentItem(itemId));
  };

  const editItem = (itemId)=>{
    dispatch(selectingCurrentItem(itemId));
    navigate("/editItem")
  }

  const toggleCheck = (selectedList, status, item) => {
    if (userAuth) {
      toggleCheckInFirestore(userAuth.id, selectedList.id, item);
    } else {
      dispatch(toggleCheckStatus(selectedList.id, item.id, !status));
    }
  };

  const changeQuantity = (listId, id, quantity) => {
    if (userAuth) {
      changeQuantityInFirestore(userAuth.id, listId, id, quantity);
    } else {
      dispatch(changeItemQuantity(listId, id, quantity));
    }
  };

  const closeModal = () => {
    setShow(!show);
  };

  return (
    <Fragment>
      {show && (
        <Modalpopup show={show} closeModal={closeModal} selectedList={selectedList} item={item} userAuth={userAuth} />
      )}
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
              {itemName}
            </p>
          </div>
          <div className={styles.edit_list}>
            <i
              className={`${styles.edit} fas fa-regular fa-pencil pr-1`}
              role="button"
              // onClick={() => handleShowModal(id)}
              onClick={()=>editItem(id)}
              aria-hidden="true"
            ></i>
            <i
              className={`${styles.garbage} fas fa-regular fa-trash pr-1`}
              role="button"
              onClick={() => deleteItem(selectedList.id, selectedList.listName)}
              aria-hidden="true"
            ></i>

            <input
              onChange={onChangeQuantity}
              onClick={() => changeQuantity(selectedList.id, id, quantity)}
              className={`${styles.quantity} mr-1`}
              type="number"
              aria-label="Insert a number"
              name="quantity"
              min="1"
              max="20"
              aria-describedby="number of items of the same kind"
              value={quantity}
            />
            <i className="fas fa-solid fa-box-open text-warning"></i>
          </div>
        </div>
      </li>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    userAuth: state.userReducer.user,
    selectedList: state.listReducer.selectedList,
    lists: state.listReducer.lists,
  };
};

export default connect(mapStateToProps)(Item);
