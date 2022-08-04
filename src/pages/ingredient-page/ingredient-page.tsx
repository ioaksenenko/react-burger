import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { useDispatch } from '../../services/hooks';
import { setIngredient } from '../../services/actions/constructor';
import { INGREDIENTS_URL } from '../../utils/urls';
import { withAxios } from '../../components/hocs';
import { sendRequest } from '../../services/actions/axios';
import { IReactRouterDomParams, TIngredientsResponse } from '../../services/types';

const IngredientPage = () => {
    const params = useParams<IReactRouterDomParams>();
    const dispatch = useDispatch();

    const onSuccess = (data: TIngredientsResponse) => {
        const ingredient = data?.data.find(indredient => indredient._id === params.id);
        if (ingredient) {
            dispatch(setIngredient(ingredient));
        }
    }

    const WithAxiosIngredientDetails = withAxios({
        method: 'get',
        url: INGREDIENTS_URL
    }, onSuccess)(IngredientDetails);

    useEffect(
        () => {
            dispatch(sendRequest(INGREDIENTS_URL));
        },
        [dispatch]
    );

    return (
        <WithAxiosIngredientDetails />
    );
};

export default IngredientPage;