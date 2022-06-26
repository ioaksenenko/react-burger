import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { useDispatch } from 'react-redux';
import { setIngredient } from '../../services/actions/constructor';
import { INGREDIENTS_URL } from '../../utils/urls';
import { withAxios } from '../../components/hocs';
import { sendRequest } from '../../services/actions/axios';

const IngredientPage = () => {
    const params = useParams();
    const dispatch = useDispatch();

    const onSuccess = (data) => {
        const ingredient = data?.data.find(indredient => indredient._id === params.id);
        dispatch(setIngredient(ingredient));
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