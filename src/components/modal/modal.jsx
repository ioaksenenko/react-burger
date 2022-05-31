import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById("modalRoot");

const Modal = ({title, show, handleClose, children}) => {
    const handleModalClick = (e) => {
        e.stopPropagation();
    }

    const escapeKeyPress = (e) => {
        if (e.key === "Escape") {
            handleClose();
        }
    } 

    useEffect(() => {
        document.addEventListener("keydown", escapeKeyPress, false);
        return () => {
            document.removeEventListener("keydown", escapeKeyPress, false);
        }
    });

    return createPortal(
        <ModalOverlay show={show} handleClose={handleClose}>
            <div className={styles.modal} onClick={handleModalClick}>
                <div className={styles.head}>
                    <p className={classNames("text text_type_main-large", styles.title)}>{title}</p>
                    <span className={styles.closeIcon} onClick={handleClose}><CloseIcon type="primary" /></span>
                </div>
                <div className={styles.body}>{children}</div>
            </div>
        </ModalOverlay>,
        modalRoot
    );
};

Modal.defaultProps = {
    show: false
};

Modal.propTypes = {
    title: PropTypes.string,
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default Modal;