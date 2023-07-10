import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }) {
    
    const currentUser = useContext(CurrentUserContext);
    
    return (
        <main>
            <section className="profile">
                <div className="profile__avatar-button" onClick={onEditAvatar} >
                    <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
                </div>
                <div className="profile__info">
                    <div className="profile__block">
                        <h1 className="profile__info-name">{currentUser.name}</h1>
                        <button className="profile__edit-button" onClick={onEditProfile} type="button"></button>
                    </div>
                    <p className="profile__info-text">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" onClick={onAddPlace} type="button"></button>
            </section>

            <section className="elements"> 
                {cards.map((card) => (
                        <Card
                            card={card}
                            key={card._id}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}>    
                        </Card>
                    ))}             
            </section>
        </main>
    );
};

export default Main;