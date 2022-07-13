import { ReactNode } from "react";

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const SET_MODAL_TITLE = 'SET_MODAL_TITLE';
export const SET_MODAL_CONTENT = 'SET_MODAL_CONTENT';
export const SET_MODAL_CLOSE_CALLBACK = 'SET_MODAL_CLOSE_CALLBACK';

export interface IModalAction {
    type: 'OPEN_MODAL' | 'CLOSE_MODAL' | 'SET_MODAL_TITLE' | 'SET_MODAL_CONTENT' | 'SET_MODAL_CLOSE_CALLBACK';
    modalTitle: string | null;
    modalContent: ReactNode;
    callback: TModalCloseCallback | null;
};

export const openModal = () => ({
    type: OPEN_MODAL
});

export const closeModal = () => ({
    type: CLOSE_MODAL
});

export const setModalTitle = (modalTitle: string | null) => ({
    type: SET_MODAL_TITLE,
    modalTitle
});

export const setModalContent = (modalContent: ReactNode) => ({
    type: SET_MODAL_CONTENT,
    modalContent
});

type TModalCloseCallback = () => void;

export const setModalCloseCallback = (callback: TModalCloseCallback | null) => ({
    type: SET_MODAL_CLOSE_CALLBACK,
    callback
});