import React, { useMemo, useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withAxios } from "../hocs";
import OrderDetails from "../order-details/order-details";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { ORDERS_URL } from "../../utils/urls";
import { useHistory, useLocation } from "react-router-dom";
import { openModal, setModalTitle, setModalContent, setModalCloseCallback } from '../../services/actions/modal';
import { sendRequest } from "../../services/actions/axios";
import { useAuth } from "../../hooks";
import { clearCart } from "../../services/actions/constructor";

const OrderButton = () => {
    const cart = useSelector(store => store.con.cart);
    const history = useHistory();
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const { getUser } = useAuth();
    const location = useLocation();

    const onGetUserSuccess = useCallback(
        (data) => {
            setUser(data?.user);
        },
        []
    );

    const onGetUserError = useCallback(
        () => {
            setUser(null);
        },
        []
    );

    useEffect(
        () => {
            getUser(onGetUserSuccess, onGetUserError);
        },
        [getUser, onGetUserSuccess, onGetUserError]
    );

    const ingredients = useMemo(
        () => cart.map(
            ingredient => ingredient._id
        ), 
        [cart]
    );

    const onCloseModal = () => {
        dispatch(clearCart());
    }

    const onRequestSuccess = () => {
        dispatch(setModalTitle(null));
        dispatch(setModalContent(<OrderDetails />));
        dispatch(openModal());
        dispatch(setModalCloseCallback(onCloseModal));
    }

    const WithAxiosButton= withAxios({
      method: 'post',
      url: ORDERS_URL, 
      data: { ingredients }
    }, onRequestSuccess)(Button);

    const handleClick = () => {
        if (!user) {
            history.push({
                pathname: '/login',
                state: { from: location }
            });
        } else {
            dispatch(sendRequest(ORDERS_URL));
        }
    }

    return <WithAxiosButton onClick={handleClick} type="primary" size="large">Оформить заказ</WithAxiosButton>
}

export default OrderButton;