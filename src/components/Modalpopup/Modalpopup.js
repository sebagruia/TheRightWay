import React, { useState } from 'react';
import '../Modalpopup/Modalpopup.css';

import { connect } from 'react-redux';

import { editItemName } from '../../redux/list/listActions';
import { updatingListItemNameToFirestore } from '../../firebase/firebase.utils';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Modalpopup = ({ dispatch, userAuth, show, closeModal, item, selectedList }) => {
  const [inputValue, setInputValue] = useState('');

  const handleOnChange = (event) => {
    setInputValue(event.target.value);
  };

  const saveModalNewValue = () => {
    if (userAuth) {
      updatingListItemNameToFirestore(userAuth.id, selectedList.id, item.id, inputValue);
    } else {
      dispatch(editItemName(selectedList.id, item.id, inputValue));
    }
    closeModal();
  };

  return (
    <Modal show={show}>
      <Modal.Header className="modal-header text-white">
        <Modal.Title>Edit Entry</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <input
          onChange={handleOnChange}
          type="text"
          className="form-control inputForModal"
          placeholder="Your edit in here"
          aria-label="edit"
          aria-describedby="edit an existing entry field"
          value={inputValue ? inputValue : item.itemName}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button id="modalCancelButton" className="btn text-white" onClick={() => closeModal()}>
          Close
        </Button>
        <Button onClick={() => saveModalNewValue()} id="modalSaveButton" className="btn bg-warning text-white">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default connect(null)(Modalpopup);
