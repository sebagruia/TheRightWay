import React from 'react';
import styles from './Loading.module.scss';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface IProps {
  message?: string;
}

const Loading: React.FC<IProps> = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner}>
        <AiOutlineLoading3Quarters size={40} />
      </div>
    </div>
  );
};

export default Loading;
