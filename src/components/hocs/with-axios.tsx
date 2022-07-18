import React, { useEffect, useCallback, FC } from 'react';
import Loader from '../loader/loader';
import ErrorMessage from '../error-message/error-message';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, setModalTitle, setModalContent } from '../../services/actions/modal';
import { request } from '../../services/actions/axios';

const withAxios = <
    TRequestData extends object,
    TResponseData extends object, 
    TResponseError extends object, 
    TFCProps extends object
>(
    config: TAxiosConfig<TRequestData>, 
    successCallback: TSuccessCallback<TResponseData> | null = null, 
    errorCallback: TErrorCallback<TResponseError> | null = null
) => (WrappedComponent : FC<TFCProps>) => (props: TFCProps) => {
    const axios = useSelector<IAxiosStore<TResponseData>, IAxiosData<TResponseData>>(store => store.axios[config.url]);
    const dispatch = useDispatch();

    const handleSuccess = useCallback<TSuccessCallback<TResponseData>>(
        (data) => {
            successCallback && successCallback(data);
        },
        []
    );

    const handleError = useCallback<TErrorCallback<TResponseError>>(
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
                request(
                    config,
                    handleSuccess, 
                    handleError
                )(dispatch);
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
