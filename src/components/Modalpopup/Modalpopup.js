import React, {useState} from 'react';
import '../Modalpopup/Modalpopup.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const Modalpopup = ({ show, onChange, closeModal, saveModalNewValue }) => {
    const [inputValue, setInputValue] = useState("");

    const handleOnChange = (event)=>{
        console.log(event.target.value);
        setInputValue(event.target.value);
    }

    return (
        < Modal show = { show } >
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
                    value={inputValue}/>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    id="modalCancelButton"
                    className="btn text-white"
                    onClick={() => closeModal()}>Close</Button>
                <Button
                    onClick={() =>saveModalNewValue()}
                    id="modalSaveButton"
                    className="btn bg-warning text-white">Save</Button>
            </Modal.Footer>
            </Modal >
  
    );
}


export default Modalpopup;
