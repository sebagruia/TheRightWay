import React, { Fragment, useState } from "react";
import "./ListContent.css";

import { connect } from "react-redux";

import { addNewItemInList} from "../../redux/list/listActions";

import Item from "../../components/Item/Item";

const ListContent = ({ dispatch, lists, listDetails  }) => {
  const [inputText, setInputText] = useState("");

  const { listId, listName } = listDetails;
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
        check:false,
        quantity:"1"
      };
      dispatch(addNewItemInList(listId, item));
      setInputText("");
    }
  };

  return (
    <Fragment>
      <div className="container">
        <div className="col">
          <div className="row listContent-row">
            <div className="listContent-container">
              <form
                onSubmit={addNewItem}
                className="input-group addNewItemInput"
              >
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
              <ul className="todo-list">
                {listItems &&
                  Object.values(listItems).map((item) => (
                    <Item
                      key={item.id}
                      item={item}
                    />
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    lists: state.listReducer.lists,
    listDetails: state.listReducer.selectedList
  };
};

export default connect(mapStateToProps)(ListContent);
