export class Api {
  static apiConfig = {
    cardsFolder: "cards",
  };

  constructor({ baseUrl, headers }, rendererCb) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._rendererCb = rendererCb;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/${Api.apiConfig.cardsFolder}`, {
      headers: {
        authorization: this._headers.authorization,
      },
    })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        this._rendererCb(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
