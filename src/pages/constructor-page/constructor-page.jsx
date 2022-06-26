import React, { useEffect } from 'react';
import Constructor from '../../components/constructor/constructor';
import withAxios from '../../components/hocs/with-axios';
import { INGREDIENTS_URL } from '../../utils/urls';
import { useDispatch } from 'react-redux';
import { sendRequest } from '../../services/actions/axios';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { setModalTitle, setModalContent, openModal, setModalCloseCallback } from '../../services/actions/modal';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { setIngredient } from '../../services/actions/constructor';

const ConstructorPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { id } = useParams();
    const history = useHistory();

    const onCloseModal = () => {
        history.replace({
            pathname: '/',
            state: null
        });
    }
    
    useEffect(
        () => {
            dispatch(sendRequest(INGREDIENTS_URL));
        },
        [dispatch]
    );

    const onSuccess = (data) => {
        if (location.state?.modal) {
            const ingredient = data?.data.find(ingredient => ingredient._id === id);
            dispatch(setIngredient(ingredient));
            dispatch(setModalTitle('Детали ингредиента'));
            dispatch(setModalContent(<IngredientDetails />));
            dispatch(setModalCloseCallback(onCloseModal));
            dispatch(openModal());
            history.replace({
                pathname: `/ingredients/${ingredient._id}`,
                state: { modal: true }
            });
        }
    }

    const WithAxiosConstructor = withAxios({
        method: 'get',
        url: INGREDIENTS_URL
    }, onSuccess)(Constructor);

    return (
        <WithAxiosConstructor />
    );
};

export default ConstructorPage;