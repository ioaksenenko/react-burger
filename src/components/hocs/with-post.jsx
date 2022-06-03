import React, { useState, useReducer } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import Loader from '../loader/loader';
import { DataContext } from '../../services/withPostContext';
import { reducer, initialState } from '../../reducers/fetch-reducer';
import ErrorMessage from '../error-message/error-message';

const withPost = (url, data, text) => WrappedComponent => props => {
    const [showModal, setShowModal] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);

    const submit = () => {
        dispatch({ type: "loading" });
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            response => response.json()
        ).then(
            data => {
                setShowModal(true);
                if (data.success) {
                    dispatch({
                        type: "success", 
                        payload: data
                    });
                } else {
                    dispatch({
                        type: "error", 
                        payload: (data.hasOwnProperty("error") && data.error) || 'Неизвестная ошибка'
                    });
                }
            }
        ).catch(
            error => {
                setShowModal(true);
                dispatch({
                    type: "error", 
                    payload: error.message || 'Неизвестная ошибка'
                });
            }
        )
    };

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <>
        <Button type="primary" size="large" onClick={submit}>{text}</Button>
        <Loader loading={state.loading} />
        <Modal show={showModal} handleClose={handleCloseModal}>
            {state.error ? (
                <ErrorMessage>
                    <p className="text text_type_main-medium mt-5">Во время отправки данных произошла ошибка.</p>
                    <p className="text text_type_main-medium mt-5">Попробуйте повторить запрос позже.</p>
                </ErrorMessage>
            ) : (
                <DataContext.Provider value={{ data: state.data }}>
                    {state.data && <WrappedComponent {...props} />}
                </DataContext.Provider>
            )}
        </Modal>
        </>
    )
};

export default withPost;
