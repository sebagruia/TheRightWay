import React, { FC } from 'react';
import styles from './BackArrow.module.scss';

import { Link } from 'react-router-dom';

import { BsBoxArrowInLeft } from 'react-icons/bs';

interface IProps {
  route: string;
}

const BackArrow: FC<IProps> = ({ route }) => {
  return (
    <Link to={route} className={styles.backArrow}>
      <BsBoxArrowInLeft size="32px" />
    </Link>
  );
};

export default BackArrow;
