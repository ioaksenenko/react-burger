export type TSuccess = {
    readonly success: boolean;
};

export type TMessage = {
    readonly message: string;
};

export type TUserData = {
    readonly email: string;
    readonly name: string;
};

export type TUser = {
    readonly user: TUserData;
};

export type TAccessToken = {
    readonly accessToken: string;
};

export type TRefreshToken = {
    readonly refreshToken: string;
};

export type TSuccessWithMessage = TSuccess & TMessage;

export type TForgotPasswordResponse = TSuccessWithMessage;
export type TResetPasswordResponse = TSuccessWithMessage;
export type TLogoutResponse = TSuccessWithMessage;

export type TAccessWithRefreshToken = TAccessToken & TRefreshToken;

export type TRegisterResponse = TSuccessWithMessage & TUser & TAccessWithRefreshToken;
export type TLoginResponse = TSuccessWithMessage & TUser & TAccessWithRefreshToken;

export type TTokenResponse = TSuccessWithMessage & TAccessWithRefreshToken;

export type TUserResponse = TSuccessWithMessage & TUser;

export type TIngredient = {
    readonly _id: string;
    readonly name: string;
    readonly type: string;
    readonly proteins: number;
    readonly fat: number;
    readonly carbohydrates: number;
    readonly calories: number;
    readonly price: number;
    readonly image: string;
    readonly image_mobile: string;
    readonly image_large: string;
    readonly __v: string;
    readonly uuid: string;
    readonly [key: string]: string | number;
};

export type TIngredientsResponse = TSuccessWithMessage & {
    readonly data: ReadonlyArray<TIngredient>;
};

export type TOrdersResponse = TSuccessWithMessage & {
    readonly name: string;
    readonly order: {
        readonly number: number;
    };
};