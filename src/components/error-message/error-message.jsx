import React from 'react';
import styles from './error-message.module.css';
import ErrorIcon from '../../images/error-icon.svg';
import PropTypes from 'prop-types';

const ErrorMessage = ({children}) => (
  <div className={styles.root}>
    <img className={styles.errorIcon} src={ErrorIcon} alt='Ошибка' />
    {children}
  </div>
);

ErrorMessage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default ErrorMessage;