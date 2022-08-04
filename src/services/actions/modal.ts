import { ReactNode } from 'react';
import {
    OPEN_MODAL,
    CLOSE_MODAL,
    SET_MODAL_TITLE,
    SET_MODAL_CONTENT,
    SET_MODAL_CLOSE_CALLBACK
} from '../constants';

export interface IOpenModalAction {
    readonly type: typeof OPEN_MODAL;
};

export interface ICloseModalAction {
    readonly type: typeof CLOSE_MODAL;
};

export interface ISetModalTitleAction {
    readonly type: typeof SET_MODAL_TITLE;
    readonly modalTitle: string | ReactNode | null;
};

export interface ISetModalContentAction {
    readonly type: typeof SET_MODAL_CONTENT;
    readonly modalContent: ReactNode;
};

export interface ISetModalCloseCallbackAction {
    readonly type: typeof SET_MODAL_CLOSE_CALLBACK;
    readonly callback: (() => void) | null;
};

export type TModalActions = 
    | IOpenModalAction
    | ICloseModalAction
    | ISetModalTitleAction
    | ISetModalContentAction
    | ISetModalCloseCallbackAction;

export const openModal = (): IOpenModalAction => ({
    type: OPEN_MODAL
});

export const closeModal = (): ICloseModalAction => ({
    type: CLOSE_MODAL
});

export const setModalTitle = (modalTitle: string | ReactNode | null): ISetModalTitleAction => ({
    type: SET_MODAL_TITLE,
    modalTitle
});

export const setModalContent = (modalContent: ReactNode): ISetModalContentAction => ({
    type: SET_MODAL_CONTENT,
    modalContent
});

export const setModalCloseCallback = (callback: (() => void) | null): ISetModalCloseCallbackAction => ({
    type: SET_MODAL_CLOSE_CALLBACK,
    callback
});