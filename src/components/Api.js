export class Api {
  static apiConfig = {
    userInfoFolder: "users/me",
    cardsFolder: "cards",
  };

  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/${Api.apiConfig.cardsFolder}`, {
      headers: {
        authorization: this._headers.authorization,
      },
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/${Api.apiConfig.userInfoFolder}`, {
      headers: {
        authorization: this._headers.authorization,
      },
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

  editUserInfo({ newName = "", newAbout = "" }) {
    return fetch(`${this._baseUrl}/${Api.apiConfig.userInfoFolder}`, {
      method: "PATCH",
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": this._headers["Content-Type"],
      },
      body: JSON.stringify({
        name: newName,
        about: newAbout,
      }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

  addNewCard({ cardName, cardLink }) {
    return fetch(`${this._baseUrl}/${Api.apiConfig.cardsFolder}`, {
      method: "POST",
      headers: {
        authorization: this._headers.authorization,
        "Content-Type": this._headers["Content-Type"],
      },
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

  deleteCard({ cardId }) {
    return fetch(`${this._baseUrl}/${Api.apiConfig.cardsFolder}/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._headers.authorization,        
      },      
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }
}
