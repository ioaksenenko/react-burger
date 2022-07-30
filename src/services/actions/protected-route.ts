import { ALLOW_ROUTE, FORBID_ALL } from '../constants';

export interface IAllowRouteAction {
    readonly type: typeof ALLOW_ROUTE;
    readonly path: string;
};

export interface IForbidAllAction {
    readonly type: typeof FORBID_ALL;
};

export type TProtectedRouteActions = 
    | IAllowRouteAction
    | IForbidAllAction;

export const allowRoute = (path: string): IAllowRouteAction => ({
    type: ALLOW_ROUTE,
    path
});

export const forbidAll = (): IForbidAllAction => ({
    type: FORBID_ALL
});