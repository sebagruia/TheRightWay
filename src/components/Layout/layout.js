import React from 'react';
import Navigation from '../Navigation/Navigation';
import { Fragment } from 'react';

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Navigation />
      {children}
    </Fragment>
  );
};

export default Layout;
