import React, { Fragment, useState } from 'react';
import './Item.css';

import { connect } from 'react-redux';

import {
  deleteListItem,
  selectingCurrentItem,
  toggleCheckStatus,
  changeItemQuantity,
} from '../../redux/list/listActions';
import {
  deleteListItemFromFirestore,
  toggleCheckInFirestore,
  changeQuantityInFirestore,
} from '../../firebase/firebase.utils';

import Modalpopup from '../../components/Modalpopup/Modalpopup';

const Item = ({ dispatch, userAuth, item, selectedList, lists }) => {
  const { itemName, id, check } = item;
  const quantityValue = lists[selectedList.id].items[id].quantity;

  const [quantity, setQuantity] = useState(quantityValue);
  const [show, setShow] = useState(false);

  const onChangeQuantity = (event) => {
    setQuantity(event.target.value);
    changeQuantity(selectedList.id, id, event.target.value)
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
      {show && <Modalpopup show={show} closeModal={closeModal} selectedList={selectedList} item={item} userAuth={userAuth}/>}
      <li className="li-item">
        <div className="list-component text-secondary">
          <div className="check-list">
            <i
              className={`far ${check ? 'fa-check-circle text-success' : 'fa-circle'}`}
              role="button"
              onClick={() => toggleCheck(selectedList, check, item)}
              aria-hidden="true"
            ></i>
            <p className="p-text" style={check ? { textDecoration: 'line-through' } : { textDecoration: 'initial' }}>
              {itemName}
            </p>
          </div>
          <div className="edit-list">
            <i
              className="far fa-times-circle text-danger"
              role="button"
              onClick={() => deleteItem(selectedList.id, id, selectedList.listName)}
              aria-hidden="true"
            ></i>
            <i
              className="far fa-edit text-info"
              role="button"
              onClick={() => handleShowModal(id)}
              aria-hidden="true"
            ></i>
            <input
              onChange={onChangeQuantity}
              onClick={() => changeQuantity(selectedList.id, id, quantity)}
              className="quantity"
              type="number"
              aria-label="Insert a number"
              name="quantity"
              min="1"
              max="20"
              aria-describedby="number of items of the same kind"
              value={quantity}
            />
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
