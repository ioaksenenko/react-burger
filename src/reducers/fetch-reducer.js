export const initialState = {
    data: null,
    error: null,
    loading: false
};

export function reducer(state, action) {
    switch (action.type) {
        case "success":
            return {
                data: action.payload, 
                error: null, 
                loading: false
            };
        case "error":
            return {
                data: null, 
                error: action.payload, 
                loading: false
            };
        case "loading":
            return {
                data: null, 
                error: null, 
                loading: true
            };
        default:
            return state;
    }
};