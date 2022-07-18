import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal, setModalContent, setModalTitle, setModalCloseCallback } from '../../services/actions/modal';

const modalRoot = document.getElementById('modalRoot') || document.createElement('modalRoot');

const Modal = () => {
    const { 
        modalIsOpen, modalTitle, 
        modalContent, modalOnClose 
    } = useSelector<IModalStore, IModalState>(store => store.modal);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeModal());
        modalOnClose && modalOnClose();
        dispatch(setModalTitle(null));
        dispatch(setModalContent(null));
        dispatch(setModalCloseCallback(null));
    };

    const escapeKeyPress = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            handleClose();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", escapeKeyPress, false);
        return () => {
            document.removeEventListener("keydown", escapeKeyPress, false);
        }
    });

    return createPortal(
        <>
        <div className={classNames(styles.modal, modalIsOpen ? styles.show : styles.hide)}>
            <div className={styles.head}>
                <p className={classNames("text text_type_main-large", styles.title)}>{modalTitle}</p>
                <span className={styles.closeIcon} onClick={handleClose}><CloseIcon type="primary" /></span>
            </div>
            <div className={styles.body}>{modalContent}</div>
        </div>
        <ModalOverlay show={modalIsOpen} handleClose={handleClose} />
        </>,
        modalRoot
    );
};

export default Modal;