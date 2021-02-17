import React from "react";
import "./List.css";

import {useHistory} from "react-router-dom";

const List = ({ children, list, deleteList }) => {
  const id = list.id;
  const history = useHistory();
  return (
    <li className="newListLi">
      <button
        onClick={() => {
          history.push("/listContent", {id});
        }}
        type="button"
        className="btn btn-outline-warning btn-lg btn-block capitalize button-color-orange"
      >
        {children}
      </button>
      <i onClick = {()=>deleteList(id)} className="far fa-trash-alt" role="button" aria-hidden="true"></i>
    </li>
  );
};

export default List;
