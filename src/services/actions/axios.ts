import { Dispatch } from "redux";
import { axiosInstance } from "../../utils/axios";

export const SEND_REQUEST = 'SEND_REQUEST';
export const SET_DATA = 'SET_DATA';
export const SET_ERROR = 'SET_ERROR';
export const CLEAR_RESPONSE = 'CLEAR_RESPONSE';

export const sendRequest = (url: string) => ({
    type: SEND_REQUEST,
    url
});

export type TAxiosAction<TResponseData extends object, TResponseError extends object> = {
    type: 'SEND_REQUEST' | 'SET_DATA' | 'SET_ERROR' | 'CLEAR_RESPONSE';
    url: string;
    data?: TResponseData;
    error?: TResponseError;
};

export interface TRequest {
    <TRequestData extends object, TResponseData extends object, TResponseError extends object>(
        config : TAxiosConfig<TRequestData>, 
        successCallback : TSuccessCallback<TResponseData>, 
        errorCallback : TErrorCallback<TResponseError>
    ): (
        dispatch: Dispatch<TAxiosAction<TResponseData, TResponseError>>
    ) => void;
}

export const request : TRequest = (config, successCallback, errorCallback) => dispatch => {
    axiosInstance(config).then(response => {
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

export const clearResponse = (url: string) => ({
    type: CLEAR_RESPONSE,
    url
});