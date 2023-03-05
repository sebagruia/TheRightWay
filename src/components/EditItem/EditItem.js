import React, {useState} from 'react';
import styles from './EditItem.module.scss';

import { connect } from 'react-redux';
import {stateMapping} from "../../redux/stateMapping";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import { editItemName } from '../../redux/list/listActions';
import { updatingListItemNameToFirestore } from '../../firebase/firebase.utils';

import {formatName} from "../../utils";

import backArrow from '../../assets/images/iconmonstr-arrow-59-48.png';

const EditItem = ({dispatch, userAuth, selectedList, selectedItemObject}) => {
  const [inputValue, setInputValue] = useState('');
// const 
  const handleOnChange = (event) => {
    setInputValue(event.target.value);
  };
  const saveModalNewValue = () => {
    if (userAuth) {
      updatingListItemNameToFirestore(userAuth.id, selectedList.id, selectedItemObject.id, inputValue);
    } else {
      dispatch(editItemName(selectedList.id, selectedItemObject.id, inputValue));
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col d-flex align-items-start flex-column">
          <Link to="/listContent" className="backArrow">
            <img src={backArrow} alt="back arrow" />
          </Link>
            <Card style={{ width: '576px' }} className={styles.cardContainer}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title className={styles.cardTitle}>{formatName("Item Name")}</Card.Title>
                <div className="d-flex flex-column">
                  <div className={styles.inputContainer}></div>
                  <input
                    onChange={handleOnChange}
                    type="text"
                    className="form-control inputForModal"
                    placeholder="Update item name"
                    aria-label="edit"
                    aria-describedby="edit an existing entry field"
                    value={selectedItemObject.itemName}
                  />
                  <input
                    // onChange={onChangeQuantity}
                    // onClick={() => changeQuantity(selectedList.id, id, quantity)}
                    // className={`${styles.quantity} mr-1`}
                    type="number"
                    aria-label="Insert a number"
                    name="quantity"
                    min="1"
                    max="20"
                    aria-describedby="number of items of the same kind"
                    // value={quantity}
                  />
                  <div>
                    <Button variant="primary" onClick={saveModalNewValue}>Save</Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const sm  = stateMapping(state);
  return {
    userAuth: sm.userAuth,
    lists: sm.lists,
    selectedList: sm.selectedList,
    // selectedItemId:sm.selectedItemId,
    selectedItemObject:sm.selectedItemObject
  };
};

export default connect(mapStateToProps)(EditItem);
