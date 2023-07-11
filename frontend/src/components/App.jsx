import React, { useEffect, useState } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Main from './Main.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import ImagePopup from './ImagePopup.jsx';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup.jsx'
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import Register from './Register.jsx';
import Login from './Login.jsx';
import * as auth from '../utils/auth.js';
import ProtectedRouteElement from './ProtectedRoute.jsx';
import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import InfoTooltip from './InfoTooltip.jsx';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [isTooltipImage, setIsTooltipImage] = useState('');
    const [isTooltipTitle, setIsTooltipTitle] = useState('');
    const [email, setEmail] = useState('');
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    function handleRegistration(password, email) {
        setIsLoading(true);
        auth.register(password, email)
            .then((res) => {
                navigate('/sign-in', { replace: true });
                openInfoTooltip();
            })
            .catch((err) => {
                console.log(err);
                errorInfoTooltip();
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    function handleLoginSubmit(email, password) {
        setIsLoading(true);
        if (!email || !password) {
            return
        }
        auth.login(email, password)
        .then((data) => {
            if (data.token) {
                setEmail(email);
                setValues({ email: '', password: '' });
                navigate('/', { replace: true });
                handleLogin();
            };
        })
            .catch((err) => {
                console.log(err);
                errorInfoTooltip();
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    function handleLogin() {
        setLoggedIn(true);
    };

    function tokenCheck() {
        // const jwt = localStorage.getItem('jwt');
        // if (jwt) {
            auth.checkToken()
                .then((res) => {
                    if (res) {
                        setEmail(res.data.email);
                        setLoggedIn(true);
                        navigate('/', { replace: true });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        // };
    };

    useEffect(() => {
        tokenCheck();
    }, []);

    function openInfoTooltip() {
        setIsInfoTooltipOpen(true);
        setIsTooltipImage('Ok');
        setIsTooltipTitle('Вы успешно зарегистрировались!');
    };

    function errorInfoTooltip() {
        setIsInfoTooltipOpen(true);
        setIsTooltipImage('Error');
        setIsTooltipTitle('Что-то пошло не так! Попробуйте ещё раз.');
    };

    useEffect(() => {
        if (loggedIn) {
            Promise.all([api.getUserInfo(), api.getInitialCards()])
                .then(([usersData, cardSection]) => {
                    console.log(cardSection.data)
                    setCurrentUser(usersData.data);
                    setCards(cardSection.data);
                })
                .catch((err) => {
                    console.log(err)
                });
        };
    }, [loggedIn]);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    };

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    };

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    };

    function handleCardClick(card) {
        setSelectedCard(card);
    };

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsInfoTooltipOpen(false);
        setSelectedCard(null);
    };

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);
        
        isLiked
            ? api
                .deleteLikeCard(card._id, !isLiked)
                .then((newCard) => {
                    console.log(newCard)
                    setCards((state) => state.map((c) => (c._id === card._id ? newCard.data : c)));
                })
                .catch((err) => {
                    console.log(err)
                })
            : api
                .likeCard(card._id, !isLiked)
                .then((newCard) => {
                    console.log(newCard)
                    setCards((state) => state.map((c) => (c._id === card._id ? newCard.data : c)));
                })
                .catch((err) => {
                    console.log(err)
                });
    };

    function handleCardDelete(card) {
        api
            .deleteCard(card._id)
            .then(() =>
                setCards((state) => state.filter((item) => item._id !== card._id)))
            .catch((err) => {
                console.log(err);
            });
    };

    function handleUpdateUser(userData) {
        setIsLoading(true);
        api
            .changeUserInfo(userData)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    function handleUpdateAvatar(data) {
        setIsLoading(true);
        api
            .changeAvatar(data)
            .then((avatar) => {
                setCurrentUser(avatar);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    function handleAddPlace(card) {
        setIsLoading(true);
        api
            .addCard(card)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (

        <CurrentUserContext.Provider value={currentUser}>
        <div className='page__content'>
                <Header email={ email } loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
                
            <Routes>
                    <Route path='/sign-up' element={<Register
                        onRegisterSubmit={handleRegistration} />} />
                    <Route path='/sign-in' element={<Login
                        onLoginSubmit={handleLoginSubmit} />} />
                    <Route
                        path='/'
                        element={
                            <ProtectedRouteElement
                                loggedIn={ loggedIn }
                                element={Main}
                                onEditAvatar={handleEditAvatarClick}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onCardClick={handleCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                                cards={cards}
                                 />
                        }
                    />
                 <Route path="*" element={<Navigate to="/" replace/>}/>   
                    </Routes>
                   

            { loggedIn && <Footer /> }

           
           <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isLoading={isLoading}/>       

            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlace}
                isLoading={isLoading}
                >
            </AddPlacePopup>
              
            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
                isLoading={isLoading}
                >
            </EditAvatarPopup>
          
            <PopupWithForm
                name='delete'
                title='Вы уверены?'
                buttonText='Вы уверены?'
                onClose={closeAllPopups}
            >
            </PopupWithForm>
          
            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}>
              
            </ImagePopup>
                
            <InfoTooltip
                    isOpen={isInfoTooltipOpen}
                    onClose={closeAllPopups}
                    tooltipImage={isTooltipImage}
                    title={isTooltipTitle}
                >  
            </InfoTooltip>
    
            </div>
        </CurrentUserContext.Provider>
    );
};

export default App;
