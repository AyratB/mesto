export class Api {
  static apiConfig = {
    userInfoFolder: "users/me",
    cardsFolder: "cards",
  };

  constructor({ baseUrl, headers }, cardsRendererCb, setUserInfoCb) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._cardsRendererCb = cardsRendererCb;
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
      .then((result) => this._cardsRendererCb(result))
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
}
