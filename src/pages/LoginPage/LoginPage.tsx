import React from 'react';
import styles from './LoginPage.module.scss';

import Layout from '../../components/Layout/Layout';
import Login from '../../components/Login/Login';

const LoginPage = () => {
  return (
    <Layout>
      <Login />
    </Layout>
  );
};

export default LoginPage;
