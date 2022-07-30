import React, { useEffect } from 'react';
import Constructor from '../../components/constructor/constructor';
import { withAxios } from '../../components/hocs/with-axios';
import { INGREDIENTS_URL } from '../../utils/urls';
import { useDispatch } from '../../services/hooks';
import { sendRequest } from '../../services/actions/axios';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { setModalTitle, setModalContent, openModal, setModalCloseCallback } from '../../services/actions/modal';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { setIngredient } from '../../services/actions/constructor';
import { ILocationState, IReactRouterDomParams, TIngredientsResponse } from '../../services/types';

const ConstructorPage = () => {
    const dispatch = useDispatch();
    const location = useLocation<ILocationState>();
    const { id } = useParams<IReactRouterDomParams>();
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

    const onSuccess = (data: TIngredientsResponse) => {
        if (location.state?.background) {
            const ingredient = data?.data.find(ingredient => ingredient._id === id);
            if (ingredient) {
                dispatch(setIngredient(ingredient));
            }
            dispatch(setModalTitle('Детали ингредиента'));
            dispatch(setModalContent(<IngredientDetails />));
            dispatch(setModalCloseCallback(onCloseModal));
            dispatch(openModal());
            history.replace({
                pathname: `/ingredients/${ingredient?._id}`,
                state: { background: location }
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