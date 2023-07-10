import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {

    const {values, handleChange, errors, isValid, resetForm, setValues, setIsValid} = useFormAndValidation()

    const avatarRef = useRef();

    useEffect(() => {
        resetForm();
        avatarRef.current.value = '';
        setValues({ avatar: '' });
    }, [isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault();

            onUpdateAvatar({
                avatar: avatarRef.current.value,
            });
    };

    return (
        <PopupWithForm
            name='avatar'
            title='Обновить аватар'
            buttonText={isLoading? 'Обновление...' : 'Обновить аватар'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isValid={isValid}
        >
            <input
                className={`popup__input ${!isValid ? 'popup__input_type_error' : ''}`}
                type='url'
                name='link'
                placeholder='Ссылка на изображение'
                required
                ref={avatarRef}
                id='avatar__input'
                value={values.link ?? ''}
                onChange={handleChange}
            />
            <span className={`popup__input-error id='avatar__input-error' ${errors.link && 'popup__input-error_active'}`}>{errors.link ?? ''}</span>
        </PopupWithForm>
    );
};

export default EditAvatarPopup;