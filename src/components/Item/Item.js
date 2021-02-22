import React, { useState } from "react";
import "./Item.css";

const Item = ({ item, deleteItem, handleShowModal}) => {
  const [quantity, setQuantity] = useState("1");
  const [check, setCheck] = useState(false);

  const { itemName, id } = item;

  const checkItem = () => {
    setCheck(!check);
  };

  const onChangeQuantity = (event)=>{
    setQuantity(event.target.value);
  }

  return (
    <li className="li-item">
      <div className="list-component text-secondary">
        <div className="check-list">
          <i
            className={`far ${
              check ? "fa-check-circle text-success" : "fa-circle"
            }`}
            role="button"
            onClick={checkItem}
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
            onClick={() => deleteItem(id)}
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
  );
};

export default Item;
