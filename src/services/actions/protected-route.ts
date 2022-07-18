export const ALLOW_ROUTE = 'ALLOW_ROUTE';
export const FORBID_ALL = 'FORBID_ALL';

export interface IProtectedRouteAction {
    type: 'ALLOW_ROUTE' | 'FORBID_ALL';
    path: string;
};

export const allowRoute = (path: string) => ({
    type: ALLOW_ROUTE,
    path
});

export const forbidAll = () => ({
    type: FORBID_ALL
});