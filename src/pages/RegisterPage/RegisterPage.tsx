import React from 'react';
import styles from './RegisterPage.module.scss';

import Layout from '../../components/Layout/Layout';
import Register from '../../components/Register/Register';

const RegisterPage = () => {
  return (
    <Layout>
      <Register />
    </Layout>
  );
};

export default RegisterPage;
