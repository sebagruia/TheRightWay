import React, { useState } from "react";
import "./Home.css";

import { connect } from "react-redux";

import { addNewListAction, deleteListAction } from "../../redux/list/listActions";
import { formatName } from "../../utils";

import List from "../../components/List/List";

const Home = ({ dispatch, lists }) => {
  
  const [inputText, setInputText] = useState("");

  const handleOnChange = (event) => {
    setInputText(event.target.value);
  };

  const addNewList = (event) => {
    event.preventDefault();
    if (inputText.length > 0) {
      const list = {
        id: `${inputText}${Date.now()}`,
        listName: inputText,
        items:null,
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
              <form onSubmit={addNewList} className="input-group addNewListInput">
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
                placeholder="New List Name"
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
              />
              </form>
         
            <ul className="ListSummary">
              {lists && Object.values(lists).map((list) => (
                <List
                  key={`${list.id}`}
                  list={list}
                  deleteList={deleteListName}
                >
                  {formatName(list.listName)}
                </List>
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
    lists: state.listReducer.lists,
  };
};

export default connect(mapStateToProps)(Home);
