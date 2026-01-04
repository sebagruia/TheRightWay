import React, { MouseEvent, useState } from 'react';
import styles from './SortType.module.scss';

import { toggleSort } from '../../redux/list/listActions';
import { useAppDispatch } from '../../redux/hooks';

import Toast from 'react-bootstrap/Toast';

import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';
import { MdOutlineSortByAlpha, MdSort } from 'react-icons/md';

const SortType = () => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const [sortType, setSortType] = useState('');

  const toggleToast = () => {
    setShow(!show);
  };

  const chooseSortType = (event: MouseEvent<HTMLDivElement>) => {
    dispatch(toggleSort(event.currentTarget.id));
    setSortType(event.currentTarget.id);
    toggleToast();
  };

  const generateSortTypeIcon = (sortType: string) => {
    switch (sortType) {
      case 'sortAscending':
        return <AiOutlineSortAscending size="20px" />;
      case 'sortDescending':
        return <AiOutlineSortDescending size="20px" />;
      case 'sortByCategory':
        return <MdOutlineSortByAlpha size="19px" />;
      default:
        return <MdSort size="24px" />;
    }
  };

  return (
    <div className={styles.toastContainer}>
      <div onClick={toggleToast} role="button">
        {generateSortTypeIcon(sortType)}
      </div>
      <Toast show={show} onClose={toggleToast} className={`${styles.toast} bg-white`}>
        <Toast.Header>
          <strong className="me-auto">Sort List</strong>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        </Toast.Header>
        <Toast.Body className="d-flex flex-column">
          <div id="sortAscending" className="d-flex align-items-center pb-1" onClick={chooseSortType} role="button">
            <AiOutlineSortAscending size="20px" />
            <span className="ps-2">Sort Ascending</span>
          </div>
          <div id="sortDescending" className="d-flex align-items-center pb-1" onClick={chooseSortType} role="button">
            <AiOutlineSortDescending size="20px" />
            <span className="ps-2">Sort Descending</span>
          </div>
          <div id="sortByCategory" className="d-flex align-items-center" onClick={chooseSortType} role="button">
            <MdOutlineSortByAlpha size="19px" />
            <span className="ps-2">Category</span>
          </div>
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default SortType;
