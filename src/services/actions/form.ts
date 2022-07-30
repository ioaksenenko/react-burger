import {
    SET_VALUE,
    CLEAR_FORM
} from '../constants';

export interface ISetValueAction {
    readonly type: typeof SET_VALUE;
    readonly url: string;
    readonly field: string;
    readonly value: string;
};

export interface IClearFormAction {
    readonly type: typeof CLEAR_FORM;
    readonly url: string;
};

export type TFormActions = 
    | ISetValueAction
    | IClearFormAction;

export const setValue = (
    url: string, 
    field: string, 
    value: string
): ISetValueAction => ({
    type: SET_VALUE,
    url,
    field, 
    value
});

export const clearForm = (url: string): IClearFormAction => ({
    type: CLEAR_FORM,
    url
});