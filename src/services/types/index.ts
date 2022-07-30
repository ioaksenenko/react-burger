import { Dispatch } from 'redux';
import { SyntheticEvent, ReactNode } from 'react';

import { IConstructorState } from './constructor';
import { ITargetBunState } from './target-bun';
import { IModalState } from './modal';
import { IFormState } from './form';
import { IAxiosState, TResponseDataDefault, TResponseErrorDefault } from './axios';
import { IRouteState } from './protected-route';
import { IWebSocketState } from './web-socket';

import {
    TConstructorActions,
    TTargetBunActions,
    TModalActions,
    TFormActions,
    TAxiosActions,
    TProtectedRouteActions,
    TWebSocketActions
} from '../actions';

export * from './constructor';
export * from './target-bun';
export * from './modal';
export * from './form';
export * from './axios';
export * from './protected-route';
export * from './data';
export * from './web-socket';

export type TAppActions<
    TResponseData = TResponseDataDefault, 
    TResponseError = TResponseErrorDefault
> = 
    | TConstructorActions
    | TTargetBunActions
    | TModalActions
    | TFormActions
    | TAxiosActions<TResponseData, TResponseError>
    | TProtectedRouteActions
    | TWebSocketActions;

export type TAppDispatch<
    TResponseData = TResponseDataDefault, 
    TResponseError = TResponseErrorDefault
> = Dispatch<TAppActions<TResponseData, TResponseError>>;

export type TRootState<
    TResponseData = TResponseDataDefault, 
    TResponseError = TResponseErrorDefault
> = {
    con: IConstructorState;
    bun: ITargetBunState;
    modal: IModalState;
    form: IFormState;
    axios: IAxiosState<TResponseData, TResponseError>;
    route: IRouteState;
    ws: IWebSocketState;
}

export interface ILocationState {
    readonly pathname: string;
    readonly search: string;
    readonly hash: string;
    readonly background?: ILocationState;
    readonly from?: ILocationState;
    readonly state: ILocationState;
};

export interface IButtonProps {
    readonly type?: 'secondary' | 'primary';
    readonly size?: 'small' | 'medium' | 'large';
    readonly onClick?: (() => void) | ((e: SyntheticEvent) => void);
    readonly disabled?: boolean;
    readonly name?: string;
    readonly htmlType?: 'button' | 'submit' | 'reset';
    readonly children: ReactNode;
};

export interface IReactRouterDomParams {
    readonly [id: string]: string;
}