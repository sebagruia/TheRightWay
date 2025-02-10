import React, { useState, useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import styles from './PwaUpdatePrompt.module.scss';

export const PWAUpdatePrompt = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      // eslint-disable-next-line prefer-template
      console.log('SW Registered: ' + r);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <div className={styles.reloadPromptContainer}>
      {(offlineReady || needRefresh) && (
        <div className={styles.reloadPromptToast}>
          <div className={styles.reloadPromptToastMessage}>
            {offlineReady ? (
              <span>App ready to work offline</span>
            ) : (
              <span>New content available, click on reload button to update.</span>
            )}
          </div>
          {needRefresh && (
            <button className={styles.reloadPromptToastButton} onClick={() => updateServiceWorker(true)}>
              Reload
            </button>
          )}
          <button className={styles.reloadPromptToastButton} onClick={() => close()}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};
