import React, { useState } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password-page.module.css';
import Form from '../../components/form/form';
import { RESET_URL } from '../../utils/urls';
import { useHistory } from 'react-router-dom';
import { TResetPasswordResponse, TResponseErrorDefault } from '../../services/types';

const ResetPasswordPage = () => {
    const links = [{
        classes: { root: styles.login },
        question: 'Вспомнили пароль?',
        to: '/login',
        text: 'Войти'
    }];

    const [visiblePassword, setVisiblePassword] = useState(false);

    const togglePasswordVisibility = () => {
        setVisiblePassword(!visiblePassword);
    };

    const history = useHistory();

    const [tokenError, setTokenError] = useState<string | null>(null);
    const [generalError, setGeneralError] = useState<string | null>(null);

    const onSuccess = (data: TResetPasswordResponse | null | undefined) => {
        if (data?.success) {
            history.push('/login');
        } else {
            setGeneralError(
                data?.message || 
                'Во время запроса произошла ошибка. Попробуйте повторить запрос позже.'
            );
        }
    }

    const onError = (error: TResponseErrorDefault) => {
        if (error.message === 'Incorrect reset token') {
            setTokenError('Некорректный код из письма');
        } else {
            setGeneralError(
                error.message || 
                'Во время запроса произошла ошибка. Попробуйте повторить запрос позже.'
            );
        }
    }

    const tokenErrorProps = tokenError ? { error: true, errorText: tokenError } : { };

    const handleInputChange = () => { };

    return (
        <Form 
            action={RESET_URL} 
            title="Восстановление пароля" 
            buttonChildren="Сохранить" 
            links={links} 
            onSuccess={onSuccess} 
            onError={onError}
            errorText={generalError}
        >
            <Input 
                type={visiblePassword ? 'text' : 'password'}
                icon={visiblePassword ? 'HideIcon' : 'ShowIcon'}
                onIconClick={togglePasswordVisibility}
                name="password"
                placeholder="Введите новый пароль"
                value=''
                onChange={handleInputChange}
            />
            <Input 
                type="text" 
                placeholder="Введите код из письма" 
                name="token" 
                value='' 
                onChange={handleInputChange} 
                {...tokenErrorProps} 
            />
        </Form>
    );
};

export default ResetPasswordPage;