import React from "react";
import "./Item.css";

import {useHistory} from "react-router-dom";

const Item = ({ children }) => {
  const history = useHistory();
  return (
    <li className="newListLi">
      <button
        onClick={() => {
          history.push("/listContent");
        }}
        type="button"
        className="btn btn-outline-warning btn-lg btn-block capitalize button-color-orange"
      >
        {children}
      </button>
      <i className="far fa-trash-alt" role="button" aria-hidden="true"></i>
    </li>
  );
};

export default Item;
