import { 
    OPEN_MODAL, CLOSE_MODAL, 
    SET_MODAL_TITLE, SET_MODAL_CONTENT, 
    SET_MODAL_CLOSE_CALLBACK 
} from "../actions/modal";

const initialState = {
    modalIsOpen: false,
    modalTitle: null,
    modalContent: null,
    modalOnClose: null
};

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL: {
            return {
                ...state,
                modalIsOpen: true
            };
        }
        case CLOSE_MODAL: {
            return {
                ...state,
                modalIsOpen: false
            };
        }
        case SET_MODAL_TITLE: {
            return {
                ...state,
                modalTitle: action.modalTitle
            };
        }
        case SET_MODAL_CONTENT: {
            return {
                ...state,
                modalContent: action.modalContent
            };
        }
        case SET_MODAL_CLOSE_CALLBACK: {
            return {
                ...state,
                modalOnClose: action.callback
            };
        }
        default: {
            return state;
        }
    }
};