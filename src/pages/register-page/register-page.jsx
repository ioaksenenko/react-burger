import React, { useState } from 'react';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register-page.module.css';
import Form from '../../components/form/form';
import { REGISTER_URL } from '../../utils/urls';
import { useHistory } from 'react-router-dom';

const RegisterPage = () => {
    const links = [{
        classes: { root: styles.login },
        question: 'Уже зарегистрированы?',
        to: '/login',
        text: 'Войти'
    }];

    const history = useHistory();

    const [emailError, setEmailError] = useState(null);
    const [generalError, setGeneralError] = useState(null);

    const onSuccess = (data) => {
        if (data?.success) {
            history.push('/login');
        } else {
            setGeneralError(
                data?.message || 
                'Во время запроса произошла ошибка. Попробуйте повторить запрос позже.'
            );
        }
    }

    const onError = (error) => {
        if (error === 'User already exists') {
            setEmailError('Пользователь с таким e-mail уже существует');
        } else if (error === 'Email, password and name are required fields') {
            setGeneralError('Необходимо заполнить обязательные поля');
        } else {
            setGeneralError(
                error || 
                'Во время запроса произошла ошибка. Попробуйте повторить запрос позже.'
            );
        }
    };

    const emailErrorProps = emailError ? { error: true, errorText: emailError } : { };

    return (
        <Form 
            action={REGISTER_URL} 
            title="Регистрация" 
            buttonChildren="Зарегистрироваться" 
            links={links} 
            onSuccess={onSuccess} 
            onError={onError}
            errorText={generalError}
        >
            <Input type="text" placeholder="Имя" name="name" size="default" value='' />
            <Input type="email" name="email" placeholder="E-mail" value='' {...emailErrorProps} />
            <PasswordInput name="password" />
        </Form>
    );
}

export default RegisterPage;