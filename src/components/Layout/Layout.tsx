import React, { FC, ReactNode } from 'react';
import Navigation from '../Navigation/Navigation';
import { Fragment } from 'react';

interface IProps {
  children: ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
  return (
    <Fragment>
      <Navigation />
      {children}
    </Fragment>
  );
};

export default Layout;
