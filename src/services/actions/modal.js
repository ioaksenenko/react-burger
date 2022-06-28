export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const SET_MODAL_TITLE = 'SET_MODAL_TITLE';
export const SET_MODAL_CONTENT = 'SET_MODAL_CONTENT';
export const SET_MODAL_CLOSE_CALLBACK = 'SET_MODAL_CLOSE_CALLBACK';

export const openModal = () => ({
    type: OPEN_MODAL
});

export const closeModal = () => ({
    type: CLOSE_MODAL
});

export const setModalTitle = modalTitle => ({
    type: SET_MODAL_TITLE,
    modalTitle
});

export const setModalContent = modalContent => ({
    type: SET_MODAL_CONTENT,
    modalContent
});

export const setModalCloseCallback = callback => ({
    type: SET_MODAL_CLOSE_CALLBACK,
    callback
});