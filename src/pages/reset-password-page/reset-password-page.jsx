import React, { useState } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password-page.module.css';
import Form from '../../components/form/form';
import { RESET_URL } from '../../utils/urls';
import { useHistory } from 'react-router-dom';

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

    const [tokenError, setTokenError] = useState(null);

    const onSuccess = () => {
        history.push('/login');
    }

    const onError = (error) => {
        if (error === 'Incorrect reset token') {
            setTokenError('Некорректный код из письма');
        }
    }

    const tokenErrorProps = tokenError ? { error: true, errorText: tokenError } : { };

    return (
        <Form 
            action={RESET_URL} 
            title="Восстановление пароля" 
            buttonChildren="Сохранить" 
            links={links} 
            onSuccess={onSuccess} 
            onError={onError}
        >
            <Input 
                type={visiblePassword ? 'text' : 'password'}
                icon={visiblePassword ? 'HideIcon' : 'ShowIcon'}
                onIconClick={togglePasswordVisibility}
                name="password"
                placeholder="Введите новый пароль"
                value=''
            />
            <Input type="text" placeholder="Введите код из письма" name="token" value='' {...tokenErrorProps} />
        </Form>
    );
};

export default ResetPasswordPage;