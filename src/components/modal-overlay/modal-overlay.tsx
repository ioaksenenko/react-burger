import React, { FC } from 'react';
import styles from './modal-overlay.module.css';
import classNames from 'classnames';

interface IModalOverlayProps {
    readonly show?: boolean;
    readonly handleClose?: () => void;
};

const ModalOverlay: FC<IModalOverlayProps> = ({show, handleClose}) => (
    <div className={classNames(styles.root, show ? styles.show : styles.hide)} onClick={handleClose}></div>
);

ModalOverlay.defaultProps = {
    show: false
};

export default ModalOverlay;