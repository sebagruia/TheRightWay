import React, { ChangeEvent, Dispatch, FC, useState } from 'react';
import styles from './EditItem.module.scss';

import { connect } from 'react-redux';
import { stateMapping } from '../../redux/stateMapping';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { changeQuantityInFirestore, updatingListItemNameToFirestore } from '../../firebase/firebase.utils';
import { changeItemQuantity, editItemName } from '../../redux/list/listActions';

import { Item } from '../../interfaces/item';
import { List, ListAction } from '../../interfaces/list';

import { foodCategories, formatName, units } from '../../utils';

import backArrow from '../../assets/images/iconmonstr-arrow-59-48.png';

interface IProps {
  dispatch: Dispatch<ListAction>;
  userAuth: any;
  selectedItemObject: Item;
  selectedList: List;
}

const EditItem:FC<IProps> = ({ dispatch, userAuth, selectedList, selectedItemObject }) => {
  const [inputValue, setInputValue] = useState(
    selectedItemObject && selectedItemObject.itemName ? formatName(selectedItemObject.itemName) : ''
  );
  const [quantity, setQuantity] = useState((selectedItemObject && selectedItemObject.quantity) || "1");

  const handleOnChange = (event:ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const saveEditedValue = () => {
    if (userAuth && selectedItemObject) {
      updatingListItemNameToFirestore(userAuth.id, selectedList.id, selectedItemObject.id, inputValue);
    } else {
      dispatch(editItemName(selectedList.id, selectedItemObject.id, inputValue));
    }
  };

  const changeQuantity = (userId:string, listId:string, itemId:string, quantity:string) => {
    if (userAuth) {
      changeQuantityInFirestore(userId, listId, itemId, quantity);
    } else {
      dispatch(changeItemQuantity(listId, itemId, quantity));
    }
  };

  const onChangeQuantity = (event:ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setQuantity("1");
      changeQuantity(userAuth?.id, selectedList.id, selectedItemObject.id, event.target.value);
    } else {
      setQuantity(event.target.value);
      changeQuantity(userAuth?.id, selectedList.id, selectedItemObject.id, event.target.value);
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
              <Card.Title className={styles.cardTitle}>{formatName(inputValue)}</Card.Title>
              <div className="d-flex flex-column">
                <div className={styles.inputContainer}></div>
                <input
                  onChange={handleOnChange}
                  type="text"
                  className="form-control inputForModal"
                  placeholder="Update item name"
                  aria-label="edit"
                  aria-describedby="edit an existing entry field"
                  value={inputValue}
                />
                <input
                  onChange={(event) => onChangeQuantity(event)}
                  onClick={() => changeQuantity(userAuth?.id, selectedList.id, selectedItemObject.id, quantity)}
                  className={`${styles.quantity} mr-1`}
                  type="number"
                  aria-label="Insert a number"
                  name="quantity"
                  min="1"
                  max="20"
                  aria-describedby="number of items of the same kind"
                  value={quantity}
                />

                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="unitsSelector">Units</InputLabel>
                  <Select
                    labelId="unitsSelector"
                    id="unitsSelector"
                    // value={age}
                    // onChange={handleChange}
                    label="Units"
                  >
                    {units.map((item) => (
                      <MenuItem key={item.id}>{`${item.name} (${item.unit})`}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="CategorySelector">Category</InputLabel>
                  <Select
                    labelId="CategorySelector"
                    id="CategorySelector"
                    // value={age}
                    // onChange={handleChange}
                    label="Category"
                  >
                    {foodCategories.map((item) => (
                      <MenuItem className="d-flex justify-content-between align-items-center" key={item.id}>
                        <i className={`${item.iconName} ${styles.categoryItem}`}></i>
                        <span>{item.name}</span>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <div>
                  <Button variant="primary" onClick={saveEditedValue}>
                    Save
                  </Button>
                </div>
                <i className="fa-regular fa-strawberry">TEST</i>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state:any) => {
  const sm = stateMapping(state);
  return {
    userAuth: sm.userAuth,
    lists: sm.lists,
    selectedList: sm.selectedList,
    selectedItemObject: sm.selectedItemObject,
  };
};

export default connect(mapStateToProps)(EditItem);
