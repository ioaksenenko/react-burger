import React, { useEffect, useState } from 'react';
import Loader from '../loader/loader';
import ErrorMessage from '../error-message/error-message';
import { useDispatch, useSelector } from 'react-redux';
import { request } from '../../services/actions/fetch';

const withFetch = url => WrappedComponent => props => {
    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const response = useSelector(store => store.fetch[url]);

    useEffect(
        () => {
            dispatch(request(url));
        },
        [dispatch]
    );

    useEffect(
        () => {
            if (response) {
                setData(response.data);
                setError(response.error);
                setLoading(response.loading);
            }
        },
        [response]
    );

    return (
        <>
            <Loader loading={loading} />
            {error ? (
                <ErrorMessage>
                    <p className="text text_type_main-large mt-5">Во время загрузки данных произошла ошибка.</p>
                    <p className="text text_type_main-large mt-5">Попробуйте обновить страницу позже.</p>
                </ErrorMessage>
            ) : data && <WrappedComponent {...props} />}
        </>
    )
};

export default withFetch;
