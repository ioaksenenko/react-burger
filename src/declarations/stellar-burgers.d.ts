interface IConstructorState {
    readonly cart: ReadonlyArray<TIngredient>;
    readonly ingredientIsDrag: boolean;
    readonly ingredient: TIngredient | null;
};

interface IConstructorStore {
    readonly con: IConstructorState
};

interface ITargetBunState {
    readonly isOver: boolean;
    readonly canDrop: boolean;
};

interface ITargetBunStore {
    readonly bun: ITargetBunState;
};

interface IModalState {
    readonly modalIsOpen: boolean;
    readonly modalTitle: string | null;
    readonly modalContent: React.ReactNode;
    readonly modalOnClose: (() => void) | null;
};

interface IModalStore {
    readonly modal: IModalState;
};

interface IFormFields {
    readonly [field: string]: string | boolean | number;
};

interface IFormData {
    readonly data: IFormFields;
};

interface IFormState {
    readonly [url: string]: IFormData;
};

interface IFormStore {
    readonly form: IFormState;
};

interface IAxiosData<TResponseData extends object> {
    readonly loading: boolean;
    readonly data: TResponseData;
    readonly error: string;
};

interface IAxiosState<TResponseData extends object> {
    readonly [url: string]: IAxiosData;
};

interface IAxiosStore<TResponseData extends object> {
    readonly axios: IAxiosState<TResponseData>;
};

interface IRouteState {
    readonly [path: string]: boolean;
};

interface IRouteStore {
    readonly route: IRouteState;
};

type TSuccess = {
    readonly success: boolean;
};

type TMessage = {
    readonly message: string;
};

type TUserData = {
    readonly email: string;
    readonly name: string;
};

type TUser = {
    readonly user: TUserData;
};

type TAccessToken = {
    readonly accessToken: string;
};

type TRefreshToken = {
    readonly refreshToken: string;
};

type TSuccessWithMessage = TSuccess & TMessage;

type TForgotPasswordResponse = TSuccessWithMessage;
type TResetPasswordResponse = TSuccessWithMessage;
type TLogoutResponse = TSuccessWithMessage;

type TAccessWithRefreshToken = TAccessToken & TRefreshToken;

type TRegisterResponse = TSuccessWithMessage & TUser & TAccessWithRefreshToken;
type TLoginResponse = TSuccessWithMessage & TUser & TAccessWithRefreshToken;

type TTokenResponse = TSuccessWithMessage & TAccessWithRefreshToken;

type TUserResponse = TSuccessWithMessage & TUser;

type TIngredientsResponse = TSuccessWithMessage & {
    readonly data: ReadonlyArray<TIngredient>;
};

type TOrdersResponse = TSuccessWithMessage & {
    readonly name: string;
    readonly order: {
        readonly number: number;
    };
};

type TIngredient = {
    readonly _id: string;
    readonly name: string;
    readonly type: string;
    readonly proteins?: number;
    readonly fat?: number;
    readonly carbohydrates?: number;
    readonly calories?: number;
    readonly price: number;
    readonly image: string;
    readonly image_mobile: string;
    readonly image_large: string;
    readonly __v?: string;
    readonly uuid?: string;
    readonly [key: string]: string | number;
};

interface ILocationState {
    readonly pathname: string;
    readonly search: string;
    readonly hash: string;
    readonly background?: TLocationState;
    readonly from?: TLocationState;
};

type TErrorDefault = { 
    readonly message: string;
};

type TDataDefault = { 
    readonly success: boolean;
};

type TSuccessCallback<TData extends object> = (data: TDataDefault & TData) => void;

type TErrorCallback<TError extends object> = (error: TErrorDefault & TError) => void;

type TAxiosConfig<TRequestData> = {
    readonly method?: string;
    readonly url: string;
    readonly data?: TRequestData;
};

interface IButtonProps {
    readonly type?: 'secondary' | 'primary';
    readonly size?: 'small' | 'medium' | 'large';
    readonly onClick?: (() => void) | ((e: SyntheticEvent) => void);
    readonly disabled?: boolean;
    readonly name?: string;
    readonly htmlType?: 'button' | 'submit' | 'reset';
    readonly children: ReactNode;
};

interface IReactRouterDomParams {
    readonly id: string;
}