import React, {useState} from "react";
import "./Item.css";

const Item = ({item}) => {
  const[check, setCheck] = useState(false);
  const {itemName} = item;

  const checkItem = ()=>{
    setCheck(!check);
  }
  return (
    <li className="li-item">
      <div className="list-component text-secondary">
        <div className="check-list">
          <i
            className={`far ${check ? "fa-check-circle text-success" : "fa-circle"}`}
            // style={{ display: uncheckIcon }}
            role="button"
            onClick={checkItem}
            aria-hidden="true"
          ></i>
          <p className="p-text" 
        //   style={{ textDecoration: lineThrough }}
          >
            {/* {!save ? modalInput : label} */}
            {itemName}
          </p>
        </div>
        <div className="edit-list">
          <i
            // id={label}
            className="far fa-times-circle text-danger"
            role="button"
            // onClick={deleteItem}
            aria-hidden="true"
          ></i>
          <i
            // id={index}
            className="far fa-edit text-info"
            role="button"
            // onClick={(event) => handleShow(event)}
            aria-hidden="true"
          ></i>
          <input
            // onChange={onInputChangeTheNumberOfItems}
            className="quantity"
            type="number"
            aria-label="Insert a number"
            name="quantity"
            min="1"
            max="20"
            aria-describedby="number of items of the same kind"
            // value={`${numberOfItems}`}
          />
        </div>
      </div>
    </li>
  );
};

export default Item;
