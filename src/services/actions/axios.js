import { axiosInstance } from "../../utils/axios";

export const SEND_REQUEST = 'SEND_REQUEST';
export const SET_DATA = 'SET_DATA';
export const SET_ERROR = 'SET_ERROR';

export const sendRequest = (url) => ({
    type: SEND_REQUEST,
    url
});

export const request = (config, successCallback, errorCallback) => dispatch => {
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
                error: response?.data?.message || response
            });
            errorCallback && errorCallback(response?.data?.message || response);
        }
    }).catch(error => {
        dispatch({
            type: SET_ERROR,
            url: config.url,
            error: error?.response?.data?.message || error
        });
        errorCallback && errorCallback(error?.response?.data?.message || error);
    });
}