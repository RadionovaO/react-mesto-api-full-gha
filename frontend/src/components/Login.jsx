import React from "react";
import { Link } from "react-router-dom";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function Login({ onLoginSubmit, isLoading }) {
    
    const {values, handleChange, errors, isValid } = useFormAndValidation()
  
    function handleSubmit(evt) {
        evt.preventDefault();
        if (isValid) {
            onLoginSubmit(values.email, values.password);
        };
    };

    return (
        <div className="autorization">
            <h2 className="autorization__title">Вход</h2>
            <form className="autorization__form" onSubmit={handleSubmit}>
                <input
                    className={`autorization__input ${!isValid && 'autorization__input_type_error'}`}
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={handleChange}
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
                    value={values.password ?? ''}
                />
                <span className="autorization__input-error">{errors.password ?? ''}</span>
                <button
                    className="autorization__button-save"
                    type="submit"
                    disabled={!isValid}>
                     {!isLoading ? 'Войти' : 'Загрузка...'}
                </button>
                <Link className="autorization__link" to="/sign-up">Нет аккаунта? Зарегистрируйтесь</Link>
            </form>
        </div>
    );
};

export default Login;