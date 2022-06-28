import React, { useState } from "react";
import EditInput from '../../components/edit-input/edit-input';
import Form from '../../components/form/form';
import { USER_URL } from '../../utils/urls';
import { useSelector } from "react-redux";

const ProfileForm = () => {
    const user = useSelector(store => store.axios[USER_URL]?.data?.user);
    const [emailError, setEmailError] = useState(null);
    const [generalError, setGeneralError] = useState(null);

    const onSuccess = (data) => {
        setEmailError(null);
        if (!data?.success) {
            setGeneralError(
                data?.message || 
                'Во время запроса произошла ошибка. Попробуйте повторить запрос позже.'
            );   
        }
    }
    
    const onError = (error) => {
        if (error === 'User with such email already exists') {
            setEmailError('Пользователь с таким E-mail уже существует');
        } else {
            setGeneralError(
                error || 
                'Во время запроса произошла ошибка. Попробуйте повторить запрос позже.'
            );
        }
    }

    const emailErrorProps = emailError ? { error: true, errorText: emailError } : { };

    return (
        <Form action={USER_URL} method='patch' onError={onError} onSuccess={onSuccess} errorText={generalError}>
            <EditInput type="text" placeholder="Имя" name="name" initial={user?.name} />
            <EditInput type="email" placeholder="Логин" name="email" initial={user?.email} {...emailErrorProps} />
            <EditInput type="password" placeholder="Пароль" name="password" />
        </Form>
    )
}

export default ProfileForm;