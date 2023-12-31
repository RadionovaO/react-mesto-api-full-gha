// export const BASE_URL = 'http://localhost:3000';
export const BASE_URL = 'https://api.appmesto.students.nomoreparties.sbs';

 const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

export const register = (password, email) => {
    console.log(password, email);
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ password, email }),
    })
        .then((res) => checkResponse(res));
};

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
    })
        .then((res) => checkResponse(res))
        .then((data) => {
            if (data.token) {
              localStorage.setItem('jwt', data.token);
              return data;
            }
          })
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        credentials: 'include',
    })
        .then((res) => checkResponse(res));
    
};

export const signOut = () => {
    return fetch(`${BASE_URL}/signout`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then((res) => checkResponse(res));
};