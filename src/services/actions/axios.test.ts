import { sendRequest, clearResponse, request, } from '../actions';
import { SEND_REQUEST, SET_DATA, SET_ERROR, CLEAR_RESPONSE } from '../constants';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { wsMiddleware } from '../store';
import { INGREDIENTS_URL } from '../../utils/urls';
import { axiosInstance } from '../../utils/axios';

const middlewares = [thunk, wsMiddleware]
const mockStore = configureMockStore(middlewares)

describe('test axios action creators', () => {
    it('should create an action with type SEND_REQUEST and param url', () => {
        const expectedAction = {
            type: SEND_REQUEST,
            url: INGREDIENTS_URL
        };
      
        expect(sendRequest(INGREDIENTS_URL)).toEqual(expectedAction);
    });

    it('should create an action with type CLEAR_RESPONSE and param url', () => {
        const expectedAction = {
            type: CLEAR_RESPONSE,
            url: INGREDIENTS_URL
        };
      
        expect(clearResponse(INGREDIENTS_URL)).toEqual(expectedAction);
    });
});

describe('test axios async action creators', () => {
    beforeEach(() => {
        jest.spyOn(axiosInstance, 'request').mockResolvedValue({
            data: {
                success: true,
                data: [{
                    _id: "60d3b41abdacab0026a733c6",
                    name: "Краторная булка N-200i",
                    type: "bun",
                    proteins: 80, 
                    fat: 24,
                    carbohydrates: 53,
                    calories: 420,
                    price: 1255,
                    image: "https://code.s3.yandex.net/react/code/bun-02.png",
                    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
                    __v: 0,
                    uuid: "54f21fc9-f5f3-4f9a-ad66-c53f995a8551"
                }]
            }
        })
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
  
    it('creates SET_DATA when fetching data has been done', async () => {
        const expectedActions = [{
            type: SET_DATA, 
            url: INGREDIENTS_URL, 
            data: {
                success: true,
                data: [{
                    _id: "60d3b41abdacab0026a733c6",
                    name: "Краторная булка N-200i",
                    type: "bun",
                    proteins: 80, 
                    fat: 24,
                    carbohydrates: 53,
                    calories: 420,
                    price: 1255,
                    image: "https://code.s3.yandex.net/react/code/bun-02.png",
                    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
                    __v: 0,
                    uuid: "54f21fc9-f5f3-4f9a-ad66-c53f995a8551"
                }]
            }
        }]

        const store = mockStore({});
      
        const config = {
            method: 'get',
            url: INGREDIENTS_URL
        };

        const successCallback = () => {};

        const errorCallback = () => {};

        await request(
            config, 
            successCallback, 
            errorCallback
        )(store.dispatch);
        
        return expect(store.getActions()).toEqual(expectedActions);
    });

    it('creates SET_ERROR when fetching data has been failed', async () => {
        jest.spyOn(axiosInstance, 'request').mockImplementationOnce(() => Promise.reject({
            response: {
                data: {
                    success: false,
                    message: 'You should be authorised'
                }
            }
        }));

        const expectedActions = [{
            type: SET_ERROR,
            url: INGREDIENTS_URL,
            error: {
                success: false,
                message: 'You should be authorised'
            }
        }]

        const store = mockStore({});

        const config = {
            method: 'get',
            url: INGREDIENTS_URL
        };

        const successCallback = () => {};

        const errorCallback = () => {};

        await request(
            config, 
            successCallback, 
            errorCallback
        )(store.dispatch);
        
        return expect(store.getActions()).toEqual(expectedActions);
    });
});