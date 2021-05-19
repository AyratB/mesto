export class Api {
  static apiConfig = {
    userInfoFolder: "users/me",
    cardsFolder: "cards",
  };

  constructor({ baseUrl, headers }, cardRendererCb, setUserInfoCb) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._cardRendererCb = cardRendererCb;
    this._setUserInfoCb = setUserInfoCb;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/${Api.apiConfig.cardsFolder}`, {
      headers: {
        authorization: this._headers.authorization,
      },
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      )
      .then((cards) => {
        cards.forEach((card) => this._cardRendererCb(card));
      })
      .catch((err) => console.log(err));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/${Api.apiConfig.userInfoFolder}`, {
      headers: {
        authorization: this._headers.authorization,
      },
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      )
      .then((result) => this._setUserInfoCb(result))
      .catch((err) => console.log(err));
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
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      )
      .then((result) => {
        this._setUserInfoCb(result);
      })
      .catch((err) => console.log(err));
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
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      )
      .then((newCardData) => {
        this._cardRendererCb(newCardData);
      })
      .catch((err) => console.log(err));
  }
}
