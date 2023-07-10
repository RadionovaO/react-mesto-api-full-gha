import React, {useContext, useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx';
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading}) {
    const currentUser = useContext(CurrentUserContext);

    const {values, handleChange, errors, isValid, resetForm, setValues, setIsValid} = useFormAndValidation()

    useEffect(() => {
        if (!isOpen) {
            resetForm();
        };
        setIsValid({ name: true, about: true });
        setValues({ name: currentUser.name, about: currentUser.about })
    }, [currentUser, isOpen])
 
    function handleSubmit(evt) {
        evt.preventDefault();
        if (isValid) {

            onUpdateUser({
                name: values.name,
                about: values.about,
            });
        };
    };

    return (
        <PopupWithForm
                name='edit'
                title='Редактировать профиль'
                buttonText={isLoading? 'Сохранение...' : 'Сохранить'}
                isOpen={isOpen}
                onClose={onClose} 
                onSubmit={handleSubmit}
                isValid={isValid}
                >
                <input
                    className={`popup__input ${!isValid ? 'popup__input_type_error' : ''}`}
                    type='text'
                    name='name'
                    placeholder='Имя'
                    minLength='2'
                    maxLength='40'
                    required
                    id='name__input'
                    value={values.name ?? ''}
                    onChange={handleChange}
                />
            <span className={`popup__input-error id='name__input-error' ${errors.name && 'popup__input-error_active'}`}>{errors.name ?? ''}</span>
                <input
                    className={`popup__input ${!isValid ? 'popup__input_type_error' : ''}`}
                    type='text'
                    name='about'
                    placeholder='Род деятельности'
                    required
                    minLength='2'
                    maxLength='200'
                    id='about__input'
                    value={values.about ?? ''}
                    onChange={handleChange}
                />
            <span className={`popup__input-error id='about__input-error' ${errors.about && 'popup__input-error_active'}`}>{errors.about ?? ''}</span>
            </PopupWithForm>   
    )
};

export default EditProfilePopup;