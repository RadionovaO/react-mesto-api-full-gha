import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ loggedIn, setLoggedIn, email, onSignOut }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function signOutUser() {
       // localStorage.removeItem('jwt');
        setIsMenuOpen(false);
        onSignOut();
    };

    return (
        <header className={`header ${isMenuOpen ? 'header_open' : ''} ${loggedIn ? 'header_email' : ''}`
} >
            <Link className='header__link' to='/'>
                <img className="header__logo" src={logo} alt='Логотип' />
            </Link>

            {!loggedIn ? (
               
                <Link className='header__link' to={location.pathname === '/sign-up' ? '/sign-in' : 'sign-up'}>
                    {location.pathname === '/sign-up' ? 'Войти' : 'Региcтрация'}
                </Link>    
            ) : (
                    <>
                        <div className='header__container'>
                            <p className='header__text'>{email}</p>
                            <button className='header__button' onClick={signOutUser}>Выйти</button>
                        </div> 
                    </>    
            )}

        </header>
    );
};

export default Header;