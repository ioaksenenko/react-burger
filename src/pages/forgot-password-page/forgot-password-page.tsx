import React, { useState } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password-page.module.css';
import Form from '../../components/form/form';
import { PASSWORD_RESET_URL } from '../../utils/urls';
import { useHistory } from 'react-router-dom';
import { IQuestionLinkProps } from '../../components/question-link/question-link';

const ForgotPasswordPage = () => {
    const links : ReadonlyArray<IQuestionLinkProps> = [{
        classes: { root: styles.login },
        question: 'Вспомнили пароль?',
        to: '/login',
        text: 'Войти'
    }];

    const history = useHistory();

    const [generalError, setGeneralError] = useState<string | null>(null);

    const onSuccess = (data: TForgotPasswordResponse | null | undefined) => {
        if (data?.success) {
            history.push('/reset-password');
        } else {
            setGeneralError(
                data?.message || 
                'Во время запроса произошла ошибка. Попробуйте повторить запрос позже.'
            );
        }
    }

    const onError = (error: TErrorDefault) => {
        setGeneralError(
            error.message || 
            'Во время запроса произошла ошибка. Попробуйте повторить запрос позже.'
        );
    }

    const handleInputChange = () => { };

    return (
        <Form 
            action={PASSWORD_RESET_URL} 
            title="Восстановление пароля" 
            buttonChildren="Восстановить" 
            links={links} 
            onSuccess={onSuccess}
            onError={onError}
            errorText={generalError}
        >
            <Input type="email" name="email" placeholder="Укажите e-mail" value='' onChange={handleInputChange} />
        </Form>
    );
};

export default ForgotPasswordPage;