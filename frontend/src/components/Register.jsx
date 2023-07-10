import React from "react";
import { Link } from "react-router-dom";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function Register({ onRegisterSubmit, isLoading}) {
       
    const {values, handleChange, errors, isValid, setValues} = useFormAndValidation()

    function handleSubmit(evt) {
        evt.preventDefault();
        if (isValid) {
            onRegisterSubmit(values.password, values.email);
        };
    };

    return (
        <div className="autorization">
            <h2 className="autorization__title">Регистрация</h2>
            <form className="autorization__form" onSubmit={handleSubmit}>
                <input
                    className={`autorization__input ${!isValid && 'autorization__input_type_error'}`}
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={handleChange}
                    id="email"
                    value={values.email ?? ''}
                />
                <span className="autorization__input-error">{errors.email ?? ''}</span>
                <input
                    className={`autorization__input ${!isValid && 'autorization__input_type_error'}`}
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    required
                    minLength='6'
                    onChange={handleChange}
                    id="password"
                    value={values.password ?? ''}
                />
                <span className="autorization__input-error">{errors.password ?? ''}</span>
                <button
                    className="autorization__button-save"
                    type="submit"
                    disabled={!isValid}>
                    {!isLoading ? 'Зарегистрироваться' : 'Загрузка...'}
                </button>
                <Link className="autorization__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
            </form>
        </div>
    );
};

export default Register;