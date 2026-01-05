import React, { FC } from 'react';
import styles from './AttendeesList.module.scss';

import AttendeeItem from '../AttendeeItem/AttendeeItem';

import { Attendee } from '../../interfaces/calendar';

interface IProps {
  fields: Attendee[];
  remove: (index: number) => void;
}

const AttendeesList: FC<IProps> = ({ fields, remove }) => {
  return (
    <div className={styles.attendeesList}>
      {fields.map((field, index) => (
        <AttendeeItem key={field.id} field={field} index={index} removeAttendee={remove} />
      ))}
    </div>
  );
};

export default AttendeesList;
