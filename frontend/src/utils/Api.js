// export const BASE_URL = 'http://localhost:3000';
export const BASE_URL = 'https://api.appmesto.students.nomoreparties.sbs';

class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    };

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    };

    // _request(url, options) {
    //    return fetch(url, options).then(this._checkResponse)
    // }

    //получаем карточки
    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then((res) => this._checkResponse(res));
    };  

    //получаем данные пользователя
    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
        // return fetch('http://localhost:3000/users/me', {
            method: 'GET',
            headers: this.headers,
            'Content-Type': 'application/json',
            credentials: 'include',
        })
           .then((res) => this._checkResponse(res));
    };  

    //изменение данных пользователя
    changeUserInfo(userData) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            credentials: 'include',

            body: JSON.stringify({
                name: userData.name,
                about: userData.about,
            }),
        })
        .then((res) => this._checkResponse(res));
    };

    //создание карточки
    addCard(card) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
                'Content-Type': 'application/json',
            credentials: 'include',

            body: JSON.stringify({
                name: card.name,
                link: card.link,
            }),
        })
        .then((res) => this._checkResponse(res));
    };

    //лайк карточки
    likeCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this.headers,
            // 'Content-Type': 'application/json',
            credentials: 'include',
        })
        .then((res) => this._checkResponse(res));
    };

    //удаление лайка
    deleteLikeCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this.headers,
           // 'Content-Type': 'application/json',
            credentials: 'include',
        })
        .then((res) => this._checkResponse(res));
    };

    //удаление карточки
    deleteCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
          method: 'DELETE',
          headers: this.headers,
           // 'Content-Type': 'application/json',
            credentials: 'include',
        })
        .then((res) => this._checkResponse(res));
      }

    //изменение аватара
    changeAvatar(data) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
          method: 'PATCH',
          headers: this.headers,
           // 'Content-Type': 'application/json',
            credentials: 'include',
          
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        })
        .then((res) => this._checkResponse(res));
      } 
};

const api = new Api({
    baseUrl: 'http://localhost:3000',
    headers: {
       // authorization: '15144cc9-7b57-4999-8446-a83117a0b7b6',
       // authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
    },
    credentials: 'include',
});

export default api;