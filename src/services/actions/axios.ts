import { Dispatch } from 'redux';
import { axiosInstance } from '../../utils/axios';

import { 
    SEND_REQUEST, 
    SET_DATA, 
    SET_ERROR, 
    CLEAR_RESPONSE 
} from '../constants';

import { 
    TSuccessCallback, 
    TErrorCallback, 
    TAxiosConfig, 
    TResponseDataDefault, 
    TResponseErrorDefault 
} from '../types';

export interface ISendRequestAction {
    readonly type: typeof SEND_REQUEST;
    readonly url: string;
};

export interface ISetDataAction<TResponseData = TResponseDataDefault> {
    readonly type: typeof SET_DATA;
    readonly url: string;
    readonly data: TResponseData;
};

export interface ISetErrorAction<TResponseError = TResponseErrorDefault> {
    readonly type: typeof SET_ERROR;
    readonly url: string;
    readonly error: TResponseError;
};

export interface IClearResponseAction {
    readonly type: typeof CLEAR_RESPONSE;
    readonly url: string;
};

export type TAxiosActions<
    TResponseData = TResponseDataDefault, 
    TResponseError = TResponseErrorDefault
> = 
    | ISendRequestAction
    | ISetDataAction<TResponseData>
    | ISetErrorAction<TResponseError>
    | IClearResponseAction;

export const sendRequest = (url: string): ISendRequestAction => ({
    type: SEND_REQUEST,
    url
});

export const request = <
    TRequestData, 
    TResponseData = TResponseDataDefault, 
    TResponseError = TResponseErrorDefault
>(
    config: TAxiosConfig<TRequestData>, 
    successCallback: TSuccessCallback<TResponseData>, 
    errorCallback: TErrorCallback<TResponseError>
) => (
    dispatch: Dispatch<ISetDataAction<TResponseData> | ISetErrorAction<TResponseError>>
) => {
    return axiosInstance(config).then(response => {
        if (response?.data?.success) {
            dispatch({
                type: SET_DATA, 
                url: config.url,
                data: response.data
            });
            successCallback && successCallback(response.data);
        } else {
            dispatch({
                type: SET_ERROR,
                url: config.url,
                error: response?.data || response
            });
            errorCallback && errorCallback(response?.data || response);
        }
    }).catch(error => {
        dispatch({
            type: SET_ERROR,
            url: config.url,
            error: error?.response?.data || error
        });
        errorCallback && errorCallback(error?.response?.data || error);
    });
}

export const clearResponse = (url: string): IClearResponseAction => ({
    type: CLEAR_RESPONSE,
    url
});