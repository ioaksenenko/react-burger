import React, { useEffect, useRef, useState, useCallback, ChangeEvent, FC } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './edit-input.module.css';
import classNames from 'classnames';
import { useDispatch } from '../../services/hooks';
import { sendRequest } from '../../services/actions/axios';

interface IEditInputProps {
    readonly type?: "text" | "email" | "password";
    readonly placeholder?: string;
    readonly name?: string;
    readonly value?: string;
    readonly onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    readonly url?: string;
    readonly error?: boolean;
    readonly errorText?: string;
    readonly initial?: string;
};

const EditInput : FC<IEditInputProps> = ({type, placeholder, name, value, onChange, url, error, errorText}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [disabled, setDisabled] = useState(true);
    const dispatch = useDispatch();

    const onIconClick = () => {
        inputRef.current?.removeAttribute('disabled');
        inputRef.current?.focus();
        setDisabled(false);
    }

    const disableInput = useCallback(
        () => {
            inputRef.current?.setAttribute('disabled', 'disabled');
            setDisabled(true);
            if (value) {
                if (url) {
                    dispatch(sendRequest(url));
                }
            }
        },
        [dispatch, url, value]
    );

    useEffect(
        () => {
            let ref = inputRef.current;
            ref?.addEventListener("blur", disableInput, false);
            return () => {
                ref?.removeEventListener("blur", disableInput, false);
            }
        }, 
        [disableInput]
    );

    useEffect(
        () => {
            inputRef.current?.setAttribute('disabled', 'disabled');
        },
        []
    );

    useEffect(
        () => {
            if (error) {
                onIconClick();
            }
        },
        [error]
    );

    const onChangeDefault = () => { };

    return (
        <div className={classNames(styles.root, disabled && styles.disabled)}>
            <Input
                type={type}
                placeholder={placeholder}
                onChange={onChange || onChangeDefault}
                value={value || ''}
                icon="EditIcon"
                name={name}
                ref={inputRef}
                onIconClick={onIconClick}
                size="default"
                error={error}
                errorText={errorText}
            />
        </div>
    );
};

export default EditInput;