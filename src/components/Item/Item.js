import React, { Fragment, useState } from 'react';
import './Item.css';

import { connect } from 'react-redux';

import {
  deleteListItem,
  selectingCurrentItem,
  toggleCheckStatus,
  changeItemQuantity,
} from '../../redux/list/listActions';
import { deleteListItemFromFirestore } from '../../firebase/firebase.utils';

import Modalpopup from '../../components/Modalpopup/Modalpopup';

const Item = ({ dispatch, userAuth, item, selectedList, lists }) => {
  const { itemName, id } = item;
  const quantityValue = lists[selectedList.id].items[id].quantity;
  const itemState = lists[selectedList.id].items[id].check;

  const [quantity, setQuantity] = useState(quantityValue);
  const [check, setCheck] = useState(itemState);
  const [show, setShow] = useState(false);

  const onChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const deleteItem = (listId, itemID, listName) => {
    if (userAuth) {
      deleteListItemFromFirestore(userAuth.id, listName, itemID);
    } else {
      dispatch(deleteListItem(listId, itemID));
    }
  };

  const handleShowModal = (itemId) => {
    setShow(!show);
    dispatch(selectingCurrentItem(itemId));
  };

  const toggleCheck = (listId, status, itemID) => {
    dispatch(toggleCheckStatus(listId, itemID, !status));
    setCheck(!status);
  };

  const changeQuantity = (listId, itemID, quantity) => {
    dispatch(changeItemQuantity(listId, itemID, quantity));
  };

  const closeModal = () => {
    setShow(!show);
  };

  return (
    <Fragment>
      {show && <Modalpopup show={show} closeModal={closeModal} selectedList={selectedList} />}
      <li className="li-item">
        <div className="list-component text-secondary">
          <div className="check-list">
            <i
              className={`far ${check ? 'fa-check-circle text-success' : 'fa-circle'}`}
              role="button"
              onClick={() => toggleCheck(selectedList.id, check, id)}
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
              value={`${quantity}`}
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
