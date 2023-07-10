import React from "react";

function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_image ${card ? 'popup_active' : ''}`}>
            <div className="popup__image-block">
                <img className="popup__big-image" src={card?.link} alt={card?.name} />
                <p className="popup__image-title">{card?.name}</p>
                <button
                    className="popup__close"
                    type="button"
                    onClick={onClose}>   
                </button>
            </div>
        </div>
    );
};

export default ImagePopup;