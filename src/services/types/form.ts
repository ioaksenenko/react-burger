export interface IFormFields {
    readonly [field: string]: string | boolean | number;
};

export interface IFormData {
    readonly data: IFormFields;
};

export interface IFormState {
    readonly [url: string]: IFormData;
};

export interface IFormStore {
    readonly form: IFormState;
};