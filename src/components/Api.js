export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._headers.authorization,
      },
    }).then((res) => this._getResponseData(res));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._headers.authorization,
      },
    }).then((res) => this._getResponseData(res));
  }

  editUserInfo({ newName = "", newAbout = "" }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": this._headers["Content-Type"],
      },
      body: JSON.stringify({
        name: newName,
        about: newAbout,
      }),
    }).then((res) => this._getResponseData(res));
  }

  addNewCard({ cardName, cardLink }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": this._headers["Content-Type"],
      },
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      }),
    }).then((res) => this._getResponseData(res));
  }

  deleteCard({ cardId }) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._headers.authorization,
      },
    }).then((res) => this._getResponseData(res));
  }

  addLike({ cardId }) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: this._headers.authorization,
      },
    }).then((res) => this._getResponseData(res));
  }

  removeLike({ cardId }) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._headers.authorization,
      },
    }).then((res) => this._getResponseData(res));
  }

  changeAvatar({ newAvatarLink }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": this._headers["Content-Type"],
      },
      body: JSON.stringify({
        avatar: newAvatarLink,
      }),
    }).then((res) => this._getResponseData(res));
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
}
