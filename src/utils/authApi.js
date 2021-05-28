class AuthApi {
  constructor({ baseUrl}) {
    this._BASE_URL = baseUrl
  }

  register (email, password){
    return fetch(`${this._BASE_URL}/signup`, {
      method: 'POST',
      headers: {

        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": password,
        "email": email }
        )
    })
  };

  auth (email, password){
    return fetch(`${this._BASE_URL}/signin`, {
      method: 'POST',
      headers: {

        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": password,
        "email": email }
        )
    })
  }

  jwtCheck (jwt){
    return fetch(`${this._BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${jwt}`
      }}).then(res => res.json())
      .then(data => data)

  }
  // getInitialCards() {
  //   console.log(this._baseUrl)
  //   return fetch(`${this._baseUrl}/cards`, {
  //     method: "GET",
  //     headers: this._headers
  //   })
  //     .then(this._checkResponse)
  // };

  // getUserInfo() {
  //   return fetch(`${this._baseUrl}/users/me`, {
  //     method: "GET",
  //     headers: this._headers
  //     ,
  //   })
  //     .then(this._checkResponse)
  // }

  // setUserInfo({ name, about }) {
  //   return fetch(`${this._baseUrl}/users/me`, {
  //     method: 'PATCH',
  //     headers: this._headers,
  //     body: JSON.stringify({
  //       name: name,
  //       about: about
  //     })
  //   })
  //     .then(this._checkResponse)
  // }

  // addCard(cardTitle, cardPhoto) {
  //   return fetch(`${this._baseUrl}/cards`, {
  //     method: 'POST',
  //     headers: this._headers,
  //     body: JSON.stringify({
  //       name: cardTitle,
  //       link: cardPhoto
  //     })
  //   })
  //     .then(this._checkResponse)

  // }

  // deleteCard(cardId) {
  //   return fetch(`${this._baseUrl}/cards/${cardId}`, {
  //     method: "DELETE",
  //     headers: this._headers
  //   })
  //     .then(this._checkResponse)
  // }

  // changeLikeCardStatus(cardId, isLiked) {
  //   if (isLiked) {
  //     return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
  //       method: "DELETE",
  //       headers: this._headers
  //     })
  //       .then(this._checkResponse)
  //   } else {
  //     return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
  //       method: "PUT",
  //       headers: this._headers
  //     })
  //       .then(this._checkResponse)
  //   }

  // }

  // addLike(cardId) {
  //   return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
  //     method: "PUT",
  //     headers: this._headers
  //   })
  //     .then(this._checkResponse)

  // }

  // removeLike(cardId) {
  //   return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
  //     method: "DELETE",
  //     headers: this._headers
  //   })
  //     .then(this._checkResponse)

  // }

  // changeAvatar(link) {
  //   console.log(link)
  //   return fetch(`${this._baseUrl}/users/me/avatar`, {
  //     method: "PATCH",
  //     headers: this._headers,
  //     body: JSON.stringify({
  //       avatar: link
  //     })
  //   })
  //     .then(this._checkResponse)
  // }
//   _checkResponse(res) {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(`Ошибка ${res.status}`);
//   }
}

const authApi = new AuthApi({
  baseUrl: 'https://auth.nomoreparties.co'
});
export default authApi
