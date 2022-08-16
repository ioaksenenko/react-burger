import {
    openModal,
    closeModal,
    setModalTitle,
    setModalContent,
    setModalCloseCallback
} from '../actions';

import {
    OPEN_MODAL,
    CLOSE_MODAL,
    SET_MODAL_TITLE,
    SET_MODAL_CONTENT,
    SET_MODAL_CLOSE_CALLBACK
} from '../constants';

describe('test modal action creators', () => {
    it('should create an action with type OPEN_MODAL', () => {
        const expectedAction = {
            type: OPEN_MODAL
        };
      
        expect(openModal()).toEqual(expectedAction);
    });

    it('should create an action with type CLOSE_MODAL', () => {
        const expectedAction = {
            type: CLOSE_MODAL
        };
      
        expect(closeModal()).toEqual(expectedAction);
    });

    it('should create an action with type SET_MODAL_TITLE and param modalTitle', () => {
        const modalTitle = 'some modal title';

        const expectedAction = {
            type: SET_MODAL_TITLE,
            modalTitle
        };
      
        expect(setModalTitle(modalTitle)).toEqual(expectedAction);
    });

    it('should create an action with type SET_MODAL_CONTENT and param modalContent', () => {
        const modalContent = 'some modal content';

        const expectedAction = {
            type: SET_MODAL_CONTENT,
            modalContent
        };
      
        expect(setModalContent(modalContent)).toEqual(expectedAction);
    });

    it('should create an action with type SET_MODAL_CLOSE_CALLBACK and param callback', () => {
        const callback = () => { 
            console.log('modal has been closed');
        };

        const expectedAction = {
            type: SET_MODAL_CLOSE_CALLBACK,
            callback
        };
      
        expect(setModalCloseCallback(callback)).toEqual(expectedAction);
    });
});