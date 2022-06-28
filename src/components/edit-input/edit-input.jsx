import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './edit-input.module.css';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { sendRequest } from '../../services/actions/axios';
import PropTypes from 'prop-types';

const EditInput = ({type, placeholder, name, value, onChange, url, error, errorText}) => {
    const inputRef = useRef(null);
    const [disabled, setDisabled] = useState(true);
    const dispatch = useDispatch();

    const onIconClick = () => {
        inputRef.current.removeAttribute('disabled');
        inputRef.current.focus();
        setDisabled(false);
    }

    const disableInput = useCallback(
        () => {
            inputRef.current.setAttribute('disabled', true);
            setDisabled(true);
            if (value) {
                console.log(value);
                dispatch(sendRequest(url));
            }
        },
        [dispatch, url, value]
    );

    useEffect(
        () => {
            let ref = inputRef.current;
            ref.addEventListener("blur", disableInput, false);
            return () => {
                ref.removeEventListener("blur", disableInput, false);
            }
        }, 
        [disableInput]
    );

    useEffect(
        () => {
            inputRef.current.setAttribute('disabled', true);
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

    return (
        <div className={classNames(styles.root, disabled && styles.disabled)}>
            <Input
                type={type}
                placeholder={placeholder}
                onChange={onChange}
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

EditInput.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
    url: PropTypes.string,
    error: PropTypes.bool,
    errorText: PropTypes.string
};

export default EditInput;