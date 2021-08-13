import React from 'react';
import styles from'./layout.module.scss';

import Navigation from '../Navigation/Navigation';
import { Fragment } from 'react';

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Navigation />
      {/* <div className="container">
        <div className="col"> */}
      {children}
      {/* </div>
      </div> */}
    </Fragment>
  );
};

export default Layout;
