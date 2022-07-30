import React, { Children, cloneElement, useEffect, useMemo, ReactNode, ReactElement } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { TICons } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import styles from './form.module.css';
import { QuestionLink, IQuestionLinkProps } from '../question-link/question-link';
import { useSelector, useDispatch } from '../../services/hooks';
import { setValue } from '../../services/actions/form';
import { withAxios } from '../hocs';
import classNames from 'classnames';
import { sendRequest } from '../../services/actions/axios';
import { clearForm } from '../../services/actions/form';
import { useHistory, useLocation } from 'react-router-dom';
import { 
    TResponseDataDefault, 
    TResponseErrorDefault, 
    IFormFields, 
    IButtonProps 
} from '../../services/types';

interface IFormProps<TResponseData = TResponseDataDefault, TResponseError = TResponseErrorDefault> {
    readonly method?: "post" | "patch";
    readonly action: string;
    readonly title?: string;
    readonly links?: ReadonlyArray<IQuestionLinkProps>;
    readonly buttonChildren?: ReactNode;
    readonly children: ReactNode;
    readonly onSuccess?: (data: TResponseData | null | undefined) => void;
    readonly onError?: (error: TResponseError) => void;
    readonly errorText: string | null;
    readonly classes?: {
        readonly root?: string;
    };
};

interface IInputElementProps {
    type?: 'text' | 'email' | 'password';
    placeholder?: string;
    value: string | boolean | number;
    name: string;
    success?: boolean;
    error?: boolean;
    disabled?: boolean;
    icon?: keyof TICons;
    errorText?: string;
    size?: 'default' | 'small';
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
    onIconClick?(e: React.MouseEvent<HTMLDivElement>): void;
    onBlur?(e?: React.FocusEvent<HTMLInputElement>): void;
    onFocus?(e?: React.FocusEvent<HTMLInputElement>): void;
    initial: string;
    url: string;
};

const Form = <
    TResponseData = TResponseDataDefault,
    TResponseError extends TResponseErrorDefault = TResponseErrorDefault
>(
    {
        method, 
        action, 
        title, 
        links, 
        buttonChildren, 
        children, 
        onSuccess, 
        onError, 
        errorText,
        classes
    } : IFormProps<TResponseData, TResponseError>
): ReactElement | null => {
    const dispatch = useDispatch();
    const form = useSelector(store => store.form[action]?.data);
    const history = useHistory();
    const location = useLocation();

    const handleSuccess = (data: TResponseData | null | undefined) => {
        onSuccess && onSuccess(data);
        dispatch(clearForm(action));
    }

    const handleError = (error: TResponseError) => {
        onError && onError(error);
        if (error.message === 'jwt expired') {
            history.push({
                pathname: '/login',
                state: { from: location }
            });
        }
    }

    const WithAxiosButton = withAxios<IFormFields, TResponseData, TResponseError, IButtonProps>({
        method: method,
        url: action,
        data: form
    }, handleSuccess, handleError)(Button);

    const fields = useMemo<ReadonlyArray<ReactElement<IInputElementProps>>>(
        () => Array.isArray(children) ? children : [children],
        [children]
    );

    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setValue(action, e.target.name, e.target.value));
    }

    useEffect(
        () => {
            for (let field of fields) {
                if (field.props.initial) {
                    dispatch(setValue(action, field.props.name, field.props.initial));
                }
            }
        },
        [dispatch, fields, action]
    );

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();
        dispatch(sendRequest(action));
    }

    return (
        <div className={classNames(classes?.root)}>
            {title && <p className={classNames("text text_type_main-medium", styles.title)}>{title}</p>}
            <form className={classNames(styles.form, errorText && styles.error)} onSubmit={handleSubmit}>
                {errorText && <p className={classNames("text text_type_main-default", styles.errorText)}>{errorText}</p>}
                {Children.map(
                    fields, 
                    field => cloneElement(
                        field, {
                            value: (form && form[field.props.name]) || '',
                            onChange,
                            url: action
                        }
                    )
                )}
                <div className={classNames(styles.button, !buttonChildren && styles.hide)}>
                    <WithAxiosButton type="primary" size="medium">{buttonChildren}</WithAxiosButton>
                </div>
            </form>
            {links && links.map((link, index) => <QuestionLink key={index} {...link} />)}
        </div>
    );
};

Form.defaultProps = {
    method: 'post'
};

export default Form;