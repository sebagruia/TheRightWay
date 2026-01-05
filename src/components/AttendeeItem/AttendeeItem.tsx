import React, { FC } from 'react';
import styles from './AttendeeItem.module.scss';

import { MdOutlinePersonRemoveAlt1 } from 'react-icons/md';

import { Attendee } from '../../interfaces/calendar';

interface IProps {
  field: Attendee;
  index: number;
  removeAttendee: (index: number) => void;
}

const AttendeeItem: FC<IProps> = ({ field, index, removeAttendee }) => {
  return (
    <div key={field.id} className={styles.attendeeItem}>
      <span className={styles.attendeeEmail}>{field.email}</span>
      <MdOutlinePersonRemoveAlt1
        onClick={() => removeAttendee(index)}
        className={styles.removeIcon}
        size={20}
        aria-label="Remove guest"
        title="Remove guest"
      />
    </div>
  );
};

export default AttendeeItem;
