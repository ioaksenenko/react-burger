import { ALLOW_ROUTE, FORBID_ALL, IProtectedRouteAction } from "../actions/protected-route";

const initialState = { };

interface IProtectedRouteReducer {
    (state: IRouteState, action: IProtectedRouteAction): void;
};

export const protectedRouteReducer : IProtectedRouteReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALLOW_ROUTE: {
            return {
                [action.path]: true
            };
        }
        case FORBID_ALL: {
            return { };
        }
        default: {
            return state;
        }
    }
};
