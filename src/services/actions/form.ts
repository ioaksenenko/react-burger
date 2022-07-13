export const SET_VALUE = 'SET_VALUE';
export const CLEAR_FORM = 'CLEAR_FORM';

export interface IFormAction {
    type: 'SET_VALUE' | 'CLEAR_FORM';
    url: string;
    field: string;
    value: string;
};

export const setValue = (url: string, field: string, value: string) => ({
    type: SET_VALUE,
    url,
    field, 
    value
});

export const clearForm = (url: string) => ({
    type: CLEAR_FORM,
    url
});