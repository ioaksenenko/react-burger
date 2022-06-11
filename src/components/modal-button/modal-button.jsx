import React, { useEffect } from 'react';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, setModalTitle, setModalContent } from '../../services/actions/modal';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ordersUrl } from '../../utils/data';
import PropTypes from 'prop-types';

const ModalButton = ({handleSubmit, children}) => {
    const dispatch = useDispatch();
    const response = useSelector(store => store.fetch[ordersUrl]);
    const modalContent = useSelector(store => store.modal.modalContent);
  
    const handleClick = () => {
        handleSubmit();
        dispatch(setModalTitle(null));
        dispatch(setModalContent(<OrderDetails />));
    }
  
    useEffect(
        () => {
            if (response && response.data && modalContent) {
                dispatch(openModal());
            }
        },
        [dispatch, response, modalContent]
    );
    
    return <Button onClick={handleClick} type="primary" size="large">{children}</Button>;
};

ModalButton.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
}

export default ModalButton;