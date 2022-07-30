import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { INGREDIENTS_URL } from '../../utils/urls';
import { withAxios } from '../../components/hocs';
import { sendRequest } from '../../services/actions';
import {
    TSuccessCallback,
    TErrorCallback,
    TResponseDataDefault,
    TResponseErrorDefault,
    TIngredient,
    TIngredientsResponse
} from '../../services/types';

export const withIngredients = <
    TWrappedComponentProps = { }, 
    TResponseData = TResponseDataDefault, 
    TResponseError = TResponseErrorDefault
>(
    successCallback: TSuccessCallback<TResponseData> | null = null, 
    errorCallback: TErrorCallback<TResponseError> | null = null
) => (
    WrappedComponent : FC<TWrappedComponentProps>
) => (props: TWrappedComponentProps) => {
    const dispatch = useDispatch();
    const ingredients = useSelector<ReadonlyArray<TIngredient>, TIngredientsResponse>(
        store => store.axios[INGREDIENTS_URL]?.data?.data || []
    );
    
    const WithAxiosOrderFeed = withAxios<
        undefined,
        TResponseData,
        TResponseError,
        TWrappedComponentProps
    >({
        method: 'get',
        url: INGREDIENTS_URL
    }, successCallback, errorCallback)(WrappedComponent);

    useEffect(
        () => {
            if (!ingredients.length) {
                dispatch(sendRequest(INGREDIENTS_URL));
            }
        },
        [dispatch, ingredients.length]
    );

    return (
        <WithAxiosOrderFeed {...props} />
    );
};