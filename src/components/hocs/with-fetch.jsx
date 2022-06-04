import React, { useEffect, useReducer } from 'react';
import { DataContext } from '../../services/withFetchContext';
import Loader from '../loader/loader';
import { reducer, initialState } from '../../reducers/fetch-reducer';
import ErrorMessage from '../error-message/error-message';

const withFetch = url => WrappedComponent => props => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({ type: "loading" });
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: "success", 
                        payload: data.data
                    });
                } else {
                    dispatch({
                        type: "error", 
                        payload: (data.hasOwnProperty("error") && data.error) || 'Неизвестная ошибка'
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: "error", 
                    payload: error.message || 'Неизвестная ошибка'
                });
            });
    }, []);

    return (
        <>
        <Loader loading={state.loading} />
        {state.error ? (
            <ErrorMessage>
                <p className="text text_type_main-large mt-5">Во время загрузки данных произошла ошибка.</p>
                <p className="text text_type_main-large mt-5">Попробуйте обновить страницу позже.</p>
            </ErrorMessage>
        ) : (
            <DataContext.Provider value={{ data: state.data }}>
                {state.data && <WrappedComponent {...props} />}
            </DataContext.Provider>
        )}
        </>
    )
};

export default withFetch;
