import React, { FC } from 'react';
import styles from './loader.module.css';
import FadeLoader from "react-spinners/FadeLoader";
import ModalOverlay from '../modal-overlay/modal-overlay';

interface ILoaderProps {
    readonly loading?: boolean;
}

const Loader: FC<ILoaderProps> = ({loading}) => (
    loading ? (
        <>
            <div className={styles.root}>
                <FadeLoader color="#F2F2F3" loading={loading} />
            </div>
            <ModalOverlay show />
        </>
    ) : null
);

export default Loader;