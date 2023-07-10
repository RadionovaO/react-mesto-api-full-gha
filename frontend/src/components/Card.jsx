import React, {useContext} from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
   // const isLiked = card.likes.some((id) => {
   //     return id === currentUser._id
   // });
    const isLiked = card.likes.some((i)=> i === currentUser._id);
    
    const cardLikeButtonClassName = (
        `element__like ${isLiked && 'element__like_active'}`
    );

    function handleClick() {
        onCardClick(card);
    };

    function handleLikeClick() {
        onCardLike(card);
    };

    function handleDeleteClick() {
        onCardDelete(card);
    };

    return (
       
        <div className="element">
            <img className="element__image"
                src={card.link}
                alt={card.name}
                onClick={handleClick} />
            <div className="element__name">
                <h2 className="element__title">{card.name}</h2>
                <div>
                    <button className={cardLikeButtonClassName} type="button" aria-label="Нравится" onClick={handleLikeClick}></button>
                    <p className="element__like-count">{card.likes.length}</p>
                </div>
                {isOwn && <button className="element__delete" type="button" aria-label="Удалить" onClick={handleDeleteClick}></button>}
            </div>
            </div>
          
    );
};

export default Card;