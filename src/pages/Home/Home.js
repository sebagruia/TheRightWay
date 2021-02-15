import React, { useState } from "react";
import "./Home.css";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { addNewListAction, deleteListAction } from "../../redux/list/listActions";
import { formatName } from "../../utils";

import Item from "../../components/Item/Item";

const Home = ({ dispatch, list }) => {
  const history = useHistory();
  const [inputText, setInputText] = useState("");

  const handleOnChange = (event) => {
    setInputText(event.target.value);
  };

  const addNewList = () => {
    if (inputText.length > 0) {
      const list = {
        id: `${inputText}${Date.now()}`,
        ListName: inputText,
        numberOfItems: "0",
      };
      dispatch(addNewListAction(list));
      setInputText("");
    }
  };

  const deleteListName = (id) => {
    dispatch(deleteListAction(id));
  };

  return (
    <div className="container">
      <div className="col">
        <div className="row">
          <div className="addNewListInput-container">
            <div className="input-group addNewListInput">
              <button
                onClick={addNewList}
                className="btn btn-warning plusButton"
                type="button"
                id="button-addon1"
              >
                +
              </button>
              <input
                onChange={handleOnChange}
                type="text"
                value={inputText}
                className="form-control"
                placeholder="New List Name"
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
              />
            </div>
            <ul className="ListSummary">
              {list.map((item) => (
                <Item
                  key={`${item.id}`}
                  item={item}
                  deleteList={deleteListName}
                >
                  {formatName(item.ListName)}
                </Item>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    list: state.listReducer.list,
  };
};

export default connect(mapStateToProps)(Home);
