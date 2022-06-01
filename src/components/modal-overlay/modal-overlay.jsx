import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ModalOverlay = ({show, handleClose}) => {
    return (
        <div className={classNames(styles.root, show ? styles.show : styles.hide)} onClick={handleClose}></div>
    );
};

ModalOverlay.defaultProps = {
    show: false
};

ModalOverlay.propTypes = {
    show: PropTypes.bool,
    handleClose: PropTypes.func.isRequired
};

export default ModalOverlay;