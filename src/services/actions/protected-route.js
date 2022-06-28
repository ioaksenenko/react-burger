export const ALLOW_ROUTE = 'ALLOW_ROUTE';
export const FORBID_ALL = 'FORBID_ALL';

export const allowRoute = (path) => ({
    type: ALLOW_ROUTE,
    path
})

export const forbidAll = () => ({
    type: FORBID_ALL
})