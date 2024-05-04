import React from 'react';
import styles from './Reminders.module.scss';

const Reminders = () => {
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reminders;
