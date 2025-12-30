import React, { FC, useState, useEffect } from 'react';
import styles from './ListItem.module.scss';

import { useNavigate } from 'react-router-dom';

import { connect, useDispatch } from 'react-redux';
import { deleteListItem, selectingCurrentItem, editItem } from '../../redux/list/listActions';
import { stateMapping } from '../../redux/stateMapping';

import { deleteListItemFromFirestore, updatingListItemToFirestore } from '../../firebase/firebase.utils';

import MessageToast from '../MessageToast/MessageToast';
import ModalPopUp from '../ModalPopUp/ModalPopUp';

import { CiTrash, CiMemoPad } from 'react-icons/ci';
import { IoEllipsisVerticalOutline } from 'react-icons/io5';
import { MdKeyboardArrowRight } from 'react-icons/md';

import { Item } from '../../interfaces/item';
import { List } from '../../interfaces/list';
import { ModalMessage } from '../../interfaces/modal';
import { ToastPosition } from '../../enums/messageToast';

import { formatName } from '../../utils';
interface IProps {
  userAuth: any;
  item: Item;
  selectedList: List;
}

const ListItem: FC<IProps> = ({ userAuth, item, selectedList }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState<ModalMessage>({ content: '' });
  const { id, check, quantity, unit, note } = item;

  const selectItemForEdit = (item: Item) => {
    dispatch(selectingCurrentItem(item));
    navigate(`/editItem/${id}`);
  };

  const updateItemCheckStatus = (selectedList: List, status: boolean, item: Item) => {
    if (userAuth && item) {
      updatingListItemToFirestore(userAuth.id, selectedList.id, { ...item, check: !status });
    } else {
      dispatch(editItem(selectedList.id, { ...item, check: !status }));
    }
  };

  const showToastMessage = () => {
    setShowToast(!showToast);
  };

  const openModal = () => {
    setDeleteMessage({ content: `Delete ${id}?`, closeText: 'Cancel', saveText: 'Ok' });
  };

  const closeModal = () => {
    setDeleteMessage({ content: '' });
  };

  const confirmDeletion = () => {
    setDeleteMessage({ content: '' });
    setDeleteConfirmation(true);
  };

  useEffect(() => {
    if (userAuth && deleteConfirmation) {
      deleteListItemFromFirestore(userAuth.id, selectedList.id, id);
    } else if (deleteConfirmation) {
      dispatch(deleteListItem(selectedList.id, id));
    }
  }, [deleteConfirmation]);

  return (
    <li className="li-item">
      <ModalPopUp message={deleteMessage} closeModal={closeModal} confirm={confirmDeletion} />
      <MessageToast
        show={showToast}
        message={note}
        position={ToastPosition.TopStart}
        toggleShow={showToastMessage}
        title={id}
      />
      <div className={`${styles.list_component} text-secondary`}>
        <div className={styles.check_list}>
          <i
            className={`far pe-1 ${check ? 'fa-check-circle text-success' : 'fa-circle'} ${
              styles.fa_check_circle_custom
            }`}
            role="button"
            onClick={() => updateItemCheckStatus(selectedList, check, item)}
            aria-hidden="true"
          ></i>
          <p className="p-text" style={check ? { textDecoration: 'line-through' } : { textDecoration: 'initial' }}>
            {formatName(id)}
          </p>
        </div>
        <div className={styles.edit_list}>
          <p className={`m-0 pt-1 ${styles.quantity}`}>{`${quantity} ${unit}`}</p>
          <IoEllipsisVerticalOutline />

          {note && <CiMemoPad onClick={showToastMessage} className={styles.note} size="20px" />}

          <CiTrash
            className={`${styles.garbage} fas fa-regular fa-trash pe-1`}
            role="button"
            size="24px"
            onClick={openModal}
            aria-hidden="true"
          />
          <MdKeyboardArrowRight
            className={`${styles.edit}`}
            role="button"
            size="28px"
            onClick={() => selectItemForEdit(item)}
            aria-hidden="true"
          />
        </div>
      </div>
    </li>
  );
};

const mapStateToProps = (state: any) => {
  const sm = stateMapping(state);
  return {
    userAuth: sm.userAuth,
    selectedList: sm.selectedList,
  };
};

export default connect(mapStateToProps)(ListItem);
