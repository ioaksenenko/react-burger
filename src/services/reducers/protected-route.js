import { ALLOW_ROUTE, FORBID_ALL } from "../actions/protected-route";

const initialState = { };

export const protectedRouteReducer = (state = initialState, action) => {
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
