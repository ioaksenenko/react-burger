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

export const setData = <TResponseData = TResponseDataDefault>(
    url: string, 
    data: TResponseData
): ISetDataAction<TResponseData> => ({
    type: SET_DATA,
    url,
    data
});

export const setError = <TResponseError = TResponseErrorDefault>(
    url: string, 
    error: TResponseError
): ISetErrorAction<TResponseError> => ({
    type: SET_ERROR,
    url,
    error
});

export const request = <
    TRequestData, 
    TResponseData = TResponseDataDefault, 
    TResponseError = TResponseErrorDefault
>(
    config: TAxiosConfig<TRequestData>, 
    successCallback: TSuccessCallback<TResponseData>, 
    errorCallback: TErrorCallback<TResponseError>
) => async (
    dispatch: Dispatch<ISetDataAction<TResponseData> | ISetErrorAction<TResponseError>>
): Promise<TAxiosActions<TResponseData, TResponseError>> => {
    return axiosInstance.request(config).then(response => {
        if (response?.data?.success) {
            successCallback && successCallback(response.data);
            return dispatch(setData(config.url, response.data as TResponseData));
        } else {
            errorCallback && errorCallback(response?.data || response);
            return dispatch(setError(config.url, (response?.data || response) as TResponseError));
        }
    }).catch(error => {
        errorCallback && errorCallback(error?.response?.data || error);
        return dispatch(setError(config.url, (error?.response?.data || error) as TResponseError));
    });
}

export const clearResponse = (url: string): IClearResponseAction => ({
    type: CLEAR_RESPONSE,
    url
});