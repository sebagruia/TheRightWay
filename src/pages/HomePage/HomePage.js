import React from 'react';
import styles from './HomePage.module.scss';

import Layout from '../../components/Layout/layout';
import Home from '../../components/Home/home';

const HomePage = () => {
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default HomePage;
