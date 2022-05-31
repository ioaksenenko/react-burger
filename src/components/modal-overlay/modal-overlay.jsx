import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ModalOverlay = ({show, handleClose, children}) => {
    return (
        <div className={classNames(styles.root, show ? styles.show : styles.hide)} onClick={handleClose}>
            {children}
        </div>
    );
};

ModalOverlay.defaultProps = {
    show: false
};

ModalOverlay.propTypes = {
    show: PropTypes.bool,
    handleClose: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ModalOverlay;