import React, { useState } from "react";
import "./ListContent.css";

import { connect } from "react-redux";

import { useLocation } from "react-router-dom";

import { addNewItemInList } from "../../redux/list/listActions";

import Item from "../../components/Item/Item";

const ListContent = ({ dispatch, lists }) => {
  const [inputText, setInputText] = useState("");

  const location = useLocation();
  const { listId, listName } = location.state;

  const listItems = lists[listId].items;

  const handleOnChange = (event) => {
    setInputText(event.target.value);
  };

  const addNewItem = (event) => {
    event.preventDefault();
    if (inputText.length > 0) {
      const item = {
        id: `${inputText}${Date.now()}`,
        itemName: inputText,
        lineThrough: null,
        uncheckIcon: null,
        checkIcon: "none",
        display: "",
      };
      dispatch(addNewItemInList(listId, item));
      setInputText("");
    }
  };

  const deleteItem = (id) => {
    // dispatch(deleteListAction(id));
  };

  return (
    <div className="container">
      <div className="col">
        <div className="row">
          <div className="listContent-container">
            <form onSubmit={addNewItem} className="input-group addNewListInput">
              <button
                className="btn btn-warning plusButton"
                type="submit"
                id="button-addon1"
              >
                +
              </button>
              <input
                onChange={handleOnChange}
                type="text"
                value={inputText}
                className="form-control"
                placeholder="New Item Name"
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
              />
            </form>
            <ul className="todo-list">
              <div className="list-title-wraper">
                <div>
                  <h3 className="todo-name">{listName}</h3>
                </div>

                <div>
                  <i
                    className="fas fa-save saveExitButton"
                    role="button"
                    // onClick={this.saveListButtonFunctionalities}
                  >
                    <span className="tooltiptext">Save</span>
                  </i>
                </div>
              </div>
              {listItems &&
                Object.values(listItems).map((item) => <Item key={item} item={item}/>)
                }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    lists: state.listReducer.lists,
  };
};

export default connect(mapStateToProps)(ListContent);
