import React, { useState, useEffect } from 'react';
import Loader from '../loader/loader';
import ErrorMessage from '../error-message/error-message';
import { useDispatch, useSelector } from 'react-redux';
import { request } from '../../services/actions/fetch';
import { openModal, setModalTitle, setModalContent } from '../../services/actions/modal';

const withPost = (url, data) => WrappedComponent => props => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const response = useSelector(store => store.fetch[url]);
    const dispatch = useDispatch();

    useEffect(
        () => {
            if (response) {
                setError(response.error);
                setLoading(response.loading);
            }
        },
        [response]
    );

    const handleSubmit = () => {
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        dispatch(request(url, options));
    };

    useEffect(
        () => {
            if (error) {
                dispatch(setModalTitle('Ошибка'));
                dispatch(setModalContent(
                    <ErrorMessage>
                        <p className="text text_type_main-medium mt-5">Во время отправки данных произошла ошибка.</p>
                        <p className="text text_type_main-medium mt-5">Попробуйте повторить запрос позже.</p>
                    </ErrorMessage>
                ));
                dispatch(openModal());
            }
        },
        [dispatch, error]
    );

    return (
        <>
            <Loader loading={loading} />
            <WrappedComponent handleSubmit={handleSubmit} {...props} />
        </>
    )
};

export default withPost;
