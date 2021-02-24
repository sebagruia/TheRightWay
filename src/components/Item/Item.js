import React, { Fragment, useState } from "react";
import "./Item.css";

import { connect } from "react-redux";

import {
  deleteListItem,
  selectingCurrentItem,
  toggleCheckStatus,
  changeItemQuantity
} from "../../redux/list/listActions";

import Modalpopup from "../../components/Modalpopup/Modalpopup";


const Item = ({ dispatch, listDetails, item }) => {
  const [quantity, setQuantity] = useState("1");
  const [check, setCheck] = useState(false);
  const [show, setShow] = useState(false);

  const { itemName, id } = item;
  const { listId } = listDetails;

  const onChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const deleteItem = (listId, itemID) => {
    dispatch(deleteListItem(listId, itemID));
  };

  const handleShowModal = (itemId) => {
    setShow(!show);
    dispatch(selectingCurrentItem(itemId));
  };

  const toggleCheck = (listId, status, itemID) => {
    dispatch(toggleCheckStatus(listId, itemID, !status));
    setCheck(!status);
  };

  const changeQuantity = (listId, itemID, quantity)=>{
    dispatch(changeItemQuantity(listId, itemID, quantity));
  }

  const closeModal = () => {
    setShow(!show);
  };

  return (
    <Fragment>
        {show && <Modalpopup show={show} closeModal={closeModal} />}
      <li className="li-item">
        <div className="list-component text-secondary">
          <div className="check-list">
            <i
              className={`far ${
                check ? "fa-check-circle text-success" : "fa-circle"
              }`}
              role="button"
              onClick={()=>toggleCheck(listId, check,id)}
              aria-hidden="true"
            ></i>
            <p
              className="p-text"
              style={
                check
                  ? { textDecoration: "line-through" }
                  : { textDecoration: "initial" }
              }
            >
              {itemName}
            </p>
          </div>
          <div className="edit-list">
            <i
              className="far fa-times-circle text-danger"
              role="button"
              onClick={() => deleteItem(listId, id)}
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
              onClick = {()=>changeQuantity(listId,id,quantity)}
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
    listDetails: state.listReducer.selectedList,
  };
};

export default connect(mapStateToProps)(Item);
