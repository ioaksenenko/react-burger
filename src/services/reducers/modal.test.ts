import { modalReducer } from '../reducers';

import {
    OPEN_MODAL,
    CLOSE_MODAL, 
    SET_MODAL_TITLE,
    SET_MODAL_CONTENT,
    SET_MODAL_CLOSE_CALLBACK
} from '../constants';

describe('test modal resucer', () => {
    it('should set modal is open to true and leave other state data to initial state', () => {
        const state = undefined;

        const action = {
            type: OPEN_MODAL
        };

        const expected = {
            modalIsOpen: true,
            modalTitle: null,
            modalContent: null,
            modalOnClose: null
        };

        const received = modalReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should set modal is open to true and does not change other state data', () => {
        const modalCloseCallack = () => {
            console.log('modal is closed');
        };

        const state = {
            modalIsOpen: false,
            modalTitle: 'some title',
            modalContent: 'some content',
            modalOnClose: modalCloseCallack
        };

        const action = {
            type: OPEN_MODAL
        };

        const expected = {
            modalIsOpen: true,
            modalTitle: 'some title',
            modalContent: 'some content',
            modalOnClose: modalCloseCallack
        };

        const received = modalReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should set modal is open to false and leave other state data to initial state', () => {
        const state = undefined;

        const action = {
            type: CLOSE_MODAL
        };

        const expected = {
            modalIsOpen: false,
            modalTitle: null,
            modalContent: null,
            modalOnClose: null
        };

        const received = modalReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should set modal is open to false and does not change other state data', () => {
        const modalCloseCallack = () => {
            console.log('modal is closed');
        };

        const state = {
            modalIsOpen: true,
            modalTitle: 'some title',
            modalContent: 'some content',
            modalOnClose: modalCloseCallack
        };

        const action = {
            type: CLOSE_MODAL
        };

        const expected = {
            modalIsOpen: false,
            modalTitle: 'some title',
            modalContent: 'some content',
            modalOnClose: modalCloseCallack
        };

        const received = modalReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should set modal title and leave other state data to initial state', () => {
        const state = undefined;

        const action = {
            type: SET_MODAL_TITLE,
            modalTitle: 'some title'
        };

        const expected = {
            modalIsOpen: false,
            modalTitle: 'some title',
            modalContent: null,
            modalOnClose: null
        };

        const received = modalReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should set modal title and does not change other state data', () => {
        const modalCloseCallack = () => {
            console.log('modal is closed');
        };

        const state = {
            modalIsOpen: true,
            modalTitle: null,
            modalContent: 'some content',
            modalOnClose: modalCloseCallack
        };

        const action = {
            type: SET_MODAL_TITLE,
            modalTitle: 'some title'
        };

        const expected = {
            modalIsOpen: true,
            modalTitle: 'some title',
            modalContent: 'some content',
            modalOnClose: modalCloseCallack
        };

        const received = modalReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should set modal content and leave other state data to initial state', () => {
        const state = undefined;

        const action = {
            type: SET_MODAL_CONTENT,
            modalContent: 'some content'
        };

        const expected = {
            modalIsOpen: false,
            modalTitle: null,
            modalContent: 'some content',
            modalOnClose: null
        };

        const received = modalReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should set modal content and does not change other state data', () => {
        const modalCloseCallack = () => {
            console.log('modal is closed');
        };

        const state = {
            modalIsOpen: true,
            modalTitle: 'some title',
            modalContent: null,
            modalOnClose: modalCloseCallack
        };

        const action = {
            type: SET_MODAL_CONTENT,
            modalContent: 'some content'
        };

        const expected = {
            modalIsOpen: true,
            modalTitle: 'some title',
            modalContent: 'some content',
            modalOnClose: modalCloseCallack
        };

        const received = modalReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should set modal close callback and leave other state data to initial state', () => {
        const state = undefined;
        
        const modalCloseCallack = () => {
            console.log('modal is closed');
        };

        const action = {
            type: SET_MODAL_CLOSE_CALLBACK,
            callback: modalCloseCallack
        };

        const expected = {
            modalIsOpen: false,
            modalTitle: null,
            modalContent: null,
            modalOnClose: modalCloseCallack
        };

        const received = modalReducer(state, action);

        expect(received).toEqual(expected);
    });

    it('should set modal close callback and does not change other state data', () => {
        const state = {
            modalIsOpen: true,
            modalTitle: 'some title',
            modalContent: 'some content',
            modalOnClose: null
        };
        
        const modalCloseCallack = () => {
            console.log('modal is closed');
        };

        const action = {
            type: SET_MODAL_CLOSE_CALLBACK,
            callback: modalCloseCallack
        };

        const expected = {
            modalIsOpen: true,
            modalTitle: 'some title',
            modalContent: 'some content',
            modalOnClose: modalCloseCallack
        };

        const received = modalReducer(state, action);

        expect(received).toEqual(expected);
    });
});