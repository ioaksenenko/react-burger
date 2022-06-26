export const SET_VALUE = 'SET_VALUE';
export const CLEAR_FORM = 'CLEAR_FORM';

export const setValue = (url, field, value) => ({
    type: SET_VALUE,
    url,
    field, 
    value
});

export const clearForm = (url) => ({
    type: CLEAR_FORM,
    url
});