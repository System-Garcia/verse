'use client';

import Image from 'next/image';
import styles from './alert.module.css';
import { useEffect } from 'react';

export type AlertType = 'error' | 'success' | 'info' | 'warning';

export interface AlertProps {
  message: string;
  type: AlertType;
  onClose?: () => void;
};

export const Alert = ({ message, type, onClose }: AlertProps) => {
  useEffect(() => {
    setTimeout(() => {
      const alert = document.querySelector(`.${styles.alert}`);
      alert?.classList.add(styles['alert--hide']);
    }, 3000);
  }, []);

  useEffect(() => {
    if (onClose) {
      setTimeout(() => {
        onClose();
      }, 3500);
    }
  }, []);

  return (
    <div className={`${styles['alert']} ${styles[`alert--${type}`]}`}>
      <div className={styles['alert__icon']}>
        <Image
          src={`/images/icons/${type}.svg`}
          alt={type}
          width={20}
          height={20}
        />
      </div>

      <div className={styles['alert__content']}>
        <p className={styles['alert__type']}>{type}</p>
        <p>{message}</p>
      </div>
    </div>
  );
};
