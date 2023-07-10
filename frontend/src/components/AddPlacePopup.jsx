import React, {useEffect} from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {

    const {values, handleChange, errors, isValid, resetForm, setValues} = useFormAndValidation()

    function handleSubmit(evt) {
        evt.preventDefault();
        if (isValid) { 

        onAddPlace({
            name: values.name,
            link: values.link
        });
        };
    };

    useEffect(() => {
        if (!isOpen) {
            resetForm();
        };
        setValues({name: '', link: ''})
    }, [isOpen]);

    return (
        <PopupWithForm
            name='add'
            title='Новое место'
            buttonText={isLoading? 'Создание...' : 'Создать'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isValid={isValid}
        >
            <input
                className={`popup__input ${!isValid ? 'popup__input_type_error' : ''}`}
                type='text'
                name='name'
                placeholder='Название'
                minLength='2'
                maxLength='30'
                required
                id='name__input'
                value={values.name ?? ''}
                onChange={handleChange}
            />
            <span className={`popup__input-error id='name__input-error' ${errors.name && 'popup__input-error_active'}`}>{errors.name ?? ''}</span>
            <input
                className={`popup__input ${!isValid ? 'popup__input_type_error' : ''}`}
                type='url'
                name='link'
                placeholder='Ссылка на картинку'
                required
                id='link__input'
                value={values.link ?? ''}
                onChange={handleChange}
            />
            <span className={`popup__input-error id='link__input-error' ${errors.link && 'popup__input-error_active'}`}>{errors.link ?? ''}</span>
        </PopupWithForm>
    );
};

export default AddPlacePopup;