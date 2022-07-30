export type TResponseDataDefault = { 
    readonly success: boolean;
};

export type TResponseErrorDefault = { 
    readonly message: string;
};

export interface IAxiosData<
    TResponseData = TResponseDataDefault, 
    TResponseError = TResponseErrorDefault
> {
    readonly loading: boolean;
    readonly data: TResponseData | null;
    readonly error: TResponseError | null;
};

export interface IAxiosState<
    TResponseData = TResponseDataDefault,
    TResponseError = TResponseErrorDefault
> {
    readonly [url: string]: IAxiosData<TResponseData, TResponseError>;
};

export interface IAxiosStore<
    TResponseData = TResponseDataDefault, 
    TResponseError = TResponseErrorDefault
> {
    readonly axios: IAxiosState<TResponseData, TResponseError>;
};

export type TSuccessCallback<TResponseData = TResponseDataDefault> = (
    data: TResponseData
) => void;

export type TErrorCallback<TResponseError = TResponseErrorDefault> = (
    error: TResponseError
) => void;

export type TAxiosConfig<TRequestData> = {
    readonly method?: string;
    readonly url: string;
    readonly data?: TRequestData;
};