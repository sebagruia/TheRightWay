import React, { ChangeEvent, useState } from 'react';
import styles from './Reminders.module.scss';

import ReminderButton from '../ReminderButton/ReminderButton';

const Reminders = () => {
  const [visible, setVisible] = useState(true);
  const [reminderName, setReminderName] = useState('');
  const addNewList = () => {};
  const handleClick = () => {
    setVisible(!visible);
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setReminderName(event.target.value);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className={styles.addNewReminder_container}>
            <div className={styles.titleContainer}>
              <div className={styles.h1container}>
                <h1>
                  <span className={styles.bold}>Reminders</span> <span className={styles.light}></span>Lists
                </h1>
              </div>
              <hr />
            </div>
            <form onSubmit={addNewList} className={`input-group ${styles.addNewReminderInput}`}>
              {visible ? (
                <button onClick={handleClick} className={`btn btn-warning ${styles.plusButton}`} type="submit">
                  +
                </button>
              ) : null}
              <div className={`${styles.inputGroup} ${!visible ? `reveal` : `hide`}`}>
                <input
                  onChange={handleOnChange}
                  type="text"
                  value={reminderName}
                  className={`form-control ${styles.form_control}`}
                  placeholder="New Reminder"
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                />
                <button
                  onClick={handleClick}
                  className={`btn btn-warning ${styles.addButton} `}
                  type="submit"
                  id="button-addon1"
                >
                  +
                </button>
              </div>
            </form>
            <ul className={styles.listSummary}>
              {
                <ReminderButton>
                  <div className={styles.reminderSummary}>
                    <span>Asigurare Masina</span>
                    <span className="date-text">21 Dec. 2024</span>
                  </div>
                </ReminderButton>
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reminders;
