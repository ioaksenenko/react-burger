import React, { FC, ReactNode } from 'react';
import styles from './error-message.module.css';
import ErrorIcon from '../../images/error-icon.svg';

interface IErrorMessageProps {
  readonly children: ReactNode
};

const ErrorMessage : FC<IErrorMessageProps> = ({children}) => (
  <div className={styles.root}>
    <img className={styles.errorIcon} src={ErrorIcon} alt='Ошибка' />
    {children}
  </div>
);

export default ErrorMessage;