import React, { useState } from 'react';
import styles from './PwaUpdatePrompt.module.scss';

import { useRegisterSW } from 'virtual:pwa-register/react';

import Alert from 'react-bootstrap/Alert';

export const PWAUpdatePrompt = () => {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);

  const { updateServiceWorker } = useRegisterSW({
    onRegisteredSW(swUrl) {
      console.info(`Service Worker registered at ${swUrl}`);
    },
    onRegisterError(error) {
      console.error('Service Worker registration error:', error);
    },
    onNeedRefresh() {
      console.info('New update detected. Updating...');
      setIsUpdateAvailable(true);
      updateServiceWorker?.();
    },
  });

  if (!isUpdateAvailable) return null;

  return (
    <div className={styles.alertContainer}>
      <Alert variant="warning">Aplication Updated!</Alert>
    </div>
  );
};
