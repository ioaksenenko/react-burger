import React, { useEffect, useCallback } from 'react';
import Loader from '../loader/loader';
import ErrorMessage from '../error-message/error-message';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, setModalTitle, setModalContent } from '../../services/actions/modal';
import { request } from '../../services/actions/axios';

const withAxios = (config, successCallback = null, errorCallback = null) => WrappedComponent => props => {
    const axios = useSelector(store => store.axios[config.url]);
    const dispatch = useDispatch();

    const handleSuccess = useCallback(
        (data) => {
            successCallback && successCallback(data);
        },
        []
    );

    const handleError = useCallback(
        (error) => {
            if (!errorCallback) {
                dispatch(setModalTitle('Ошибка'));
                dispatch(setModalContent(
                    <ErrorMessage>
                        <p className="text text_type_main-medium mt-5">Во время запроса произошла ошибка.</p>
                        <p className="text text_type_main-medium mt-5">Попробуйте повторить запрос позже.</p>
                    </ErrorMessage>
                ));
                dispatch(openModal());
            } else {
                errorCallback(error);
            }
        },
        [dispatch]
    );

    useEffect(
        () => {
            if (axios?.loading) {
                dispatch(
                    request(
                        config,
                        handleSuccess, 
                        handleError
                    )
                );
            }
        },
        [dispatch, handleSuccess, handleError, axios]
    );

    return (
        <>
            <Loader loading={axios?.loading} />
            <WrappedComponent {...props} />
        </>
    )
};

export default withAxios;
