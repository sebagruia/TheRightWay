import React, { ChangeEvent, FC, useState } from 'react';
import styles from './EditItem.module.scss';

import { connect, useDispatch } from 'react-redux';
import { stateMapping } from '../../redux/stateMapping';

import { editItem } from '../../redux/list/listActions';

import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { updatingListItemToFirestore } from '../../firebase/firebase.utils';

import BackArrow from '../BackArrow/BackArrow';

import { Item } from '../../interfaces/item';
import { List } from '../../interfaces/list';

import { itemsCategory, formatName, units } from '../../utils';
interface IProps {
  userAuth: any;
  selectedItemObject: Item;
  selectedList: List;
}

const EditItem: FC<IProps> = ({ userAuth, selectedList, selectedItemObject }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [item, setItem] = useState<Item>(selectedItemObject || {});

  const onSelectUnit = (event: any) => {
    setItem({ ...item, unit: event });
  };
  const onSelectCategory = (event: any) => {
    setItem({ ...item, category: event });
  };

  const handleChangeItem = (event: ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, [event.target.name]: event.target.value });
  };
  const handleChangeItemNameAndId = (event: ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, id: event.target.value, itemName: event.target.value });
  };

  const onSubmitEditedItem = (event: React.FormEvent) => {
    event.preventDefault();
    if (userAuth && selectedItemObject) {
      updatingListItemToFirestore(userAuth.id, selectedList.id, item);
    } else {
      dispatch(editItem(selectedList.id, item));
    }
    navigate(`/lists/${selectedList.id}`);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col d-flex align-items-start flex-column">
          <BackArrow route={`/lists/${selectedList.id}`} />
          <Form className={styles.customForm} onSubmit={onSubmitEditedItem}>
            <Card className={styles.cardContainer}>
              <Card.Body>
                <div className="row flex-column flex-sm-row pb-3">
                  <div className="col col-sm-8 d-flex flex-column align-items-center">
                    <InputGroup className="mb-3">
                      <InputGroup.Text id={styles.itemNameText}>Item</InputGroup.Text>
                      <Form.Control
                        type="text"
                        name="itemName"
                        placeholder="Update item name"
                        onChange={handleChangeItemNameAndId}
                        value={formatName(item.id)}
                        className={`form-control inputForModal ${styles.itemName}`}
                      />
                    </InputGroup>
                    <Dropdown onSelect={onSelectCategory} className={styles.dropDownFull} id="dropDownCategoryMaster">
                      <Dropdown.Toggle
                        variant="outline-secondary"
                        id="dropdownCategoryItem"
                        className={styles.dropDownFull}
                      >
                        {item.category || 'Category'}
                      </Dropdown.Toggle>

                      <Dropdown.Menu className={`${styles.dropDownMenu} `}>
                        {itemsCategory.map((item) => (
                          <Dropdown.Item
                            className={`${styles.dropDownCategoryUnit} d-flex justify-content-between align-items-center`}
                            key={item.id}
                            eventKey={item.name}
                          >
                            <i className={`${item.iconName} ${styles.categoryItem}`}></i>
                            <span>{item.name}</span>
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="col col-sm-4 d-flex flex-column align-items-end justify-content-between pt-sm-0 pt-1">
                    <Dropdown onSelect={onSelectUnit} className={`mb-3 ${styles.dropDownFull}`} id="dropDownUnitMaster">
                      <Dropdown.Toggle
                        variant="outline-secondary"
                        id="dropDownUnitItem"
                        className={styles.dropDownFull}
                      >
                        {item.unit || 'Unit'}
                      </Dropdown.Toggle>

                      <Dropdown.Menu className={styles.dropDownMenuUnit}>
                        {units.map((item) => (
                          <Dropdown.Item
                            className={`${styles.dropDownUnitItem} d-flex justify-content-between align-items-center`}
                            key={item.id}
                            eventKey={item.unit}
                          >
                            <span>{item.name}</span>
                            <span>{item.unit}</span>
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>

                    <InputGroup>
                      <InputGroup.Text id={styles.quantityText}>Quantity</InputGroup.Text>
                      <Form.Control
                        type="number"
                        onChange={handleChangeItem}
                        className={styles.quantity}
                        name="quantity"
                        min="1"
                        max="20"
                        value={item.quantity}
                      />
                    </InputGroup>
                  </div>
                </div>
                <div className="row mb-4 ">
                  <div className="col">
                    <InputGroup>
                      <InputGroup.Text id={styles.textInputArea}>Note</InputGroup.Text>
                      <Form.Control
                        className={styles.textArea}
                        as="textarea"
                        aria-label="With textarea"
                        value={item.note || ''}
                        onChange={handleChangeItem}
                        name="note"
                      />
                    </InputGroup>
                  </div>
                </div>
                <div className="col d-flex justify-content-end pe-0">
                  <Button type="submit" variant="outline-primary" className={styles.saveButton}>
                    Save
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const sm = stateMapping(state);
  return {
    userAuth: sm.userAuth,
    lists: sm.lists,
    selectedList: sm.selectedList,
    selectedItemObject: sm.selectedItemObject,
  };
};

export default connect(mapStateToProps)(EditItem);
