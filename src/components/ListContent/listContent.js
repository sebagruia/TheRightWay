import React, { useState } from 'react';
import './listContent.css';

import { connect } from 'react-redux';

import { addListItemToFirestore } from '../../firebase/firebase.utils';
import { addNewItemInList } from '../../redux/list/listActions';

import Item from '../../components/Item/Item';

const ListContent = ({ dispatch, userAuth, lists, selectedList }) => {
  const [inputText, setInputText] = useState('');

  const listItems = lists && lists[selectedList.id].items;

  const handleOnChange = (event) => {
    setInputText(event.target.value);
  };

  const addNewItem = (event) => {
    event.preventDefault();
    if (inputText.length > 0) {
      const item = {
        id: `${inputText}${Date.now()}`,
        itemName: inputText,
        check: false,
        quantity: '1',
      };
      if (userAuth) {
        addListItemToFirestore(userAuth.id, selectedList.id, item);
      } else {
        dispatch(addNewItemInList(selectedList.id, item));
      }
      setInputText('');
    }
  };

  return (
    <div className="container">
      <div className="col">
        <div className="row listContent-row">
          <div className="listContent-container">
            <form onSubmit={addNewItem} className="input-group addNewItemInput">
              <button className="btn btn-warning plusButton" type="submit" id="button-addon1">
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
                <h3 className="todo-name">{selectedList.listName}</h3>
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
              {listItems && Object.values(listItems).map((item) => <Item key={item.id} item={item} />)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userAuth: state.userReducer.user,
    lists: state.listReducer.lists,
    selectedList: state.listReducer.selectedList,
  };
};

export default connect(mapStateToProps)(ListContent);
