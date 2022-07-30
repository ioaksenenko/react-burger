import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { wsConnect, wsDisconnect } from '../../services/actions';
import ErrorMessage from '../../components/error-message/error-message';
import Loader from '../../components/loader/loader';

export const withSocket = <TWrappedComponentProps = { }>(url: string, query: string = '') => (
    WrappedComponent : FC<TWrappedComponentProps>
) => (props: TWrappedComponentProps) => {
    const dispatch = useDispatch();
    const { wsConnected, wsError } = useSelector(store => store.ws);

    useEffect(
        () => {
            dispatch(wsConnect(url, query));
            return () => {
                dispatch(wsDisconnect());
            };
        },
        [dispatch]
    );

    return wsConnected ? (
        <WrappedComponent {...props} />
    ) : wsError ? (
        <ErrorMessage>
            <p className="text text_type_main-medium mt-5">Соединение потеряно.</p>
            <p className="text text_type_main-medium mt-5">Попробуйте повторить попытку позже.</p>
        </ErrorMessage>
    ) : <Loader loading />;
};