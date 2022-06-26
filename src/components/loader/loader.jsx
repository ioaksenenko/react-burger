import React from 'react';
import styles from './loader.module.css';
import FadeLoader from "react-spinners/FadeLoader";
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay';

const Loader = ({loading}) => (
    loading && (
        <>
            <div className={styles.root}>
                <FadeLoader color="#F2F2F3" loading={loading} />
            </div>
            <ModalOverlay show />
        </>
    )
);

Loader.propTypes = {
    loading: PropTypes.bool
}

export default Loader;