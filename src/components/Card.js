export class Card {
  static CardSelectors = {
    cardImageClassSelector: ".card__image",
    cardHeartClassSelector: ".card__heart",
    cardDeleteIconClassSelector: ".button_type_delete-card",
    cardDescriptionClassSelector: ".card__description",
    cardClassSelector: ".card",
    cardActiveHeartClassSelector: "card__heart_active",
    cardTemplateClassSelector: "#card-template",
  };

  constructor(cardData, handleCardClick) {
    this._cardData = cardData;
    this._handleCardClick = handleCardClick;
  }

  createCard = () => {
    this._cardItem = this._getTemplate();

    this._setCardData();
    this._setCardEventListeners();
    debugger;
    return this._cardItem;
  };

  _getTemplate() {
    const cardTemplate = document
      .querySelector(Card.CardSelectors.cardTemplateClassSelector)
      .content.querySelector(Card.CardSelectors.cardClassSelector);

    return cardTemplate.cloneNode(true);
  }

  _setCardData() {
    const cardDescription = this._cardItem.querySelector(
      Card.CardSelectors.cardDescriptionClassSelector
    );
    cardDescription.textContent = this._cardData.name;
  }

  _setCardImageEventListeners = () => {
    const cardImage = this._cardItem.querySelector(
      Card.CardSelectors.cardImageClassSelector
    );
    cardImage.src = this._cardData.link;
    cardImage.alt = this._cardData.name;

    cardImage.addEventListener("click", () =>
      this._handleOpenPicture(this._cardData.name, this._cardData.link)
    );
  };

  _handleOpenPicture = (name, link) => this._handleCardClick(name, link);

  _setCardEventListeners() {
    this._setCardImageEventListeners();
    this._setLikeIconEventListeners();
    this._setDeleteIconEventListeners();
  }

  _setLikeIconEventListeners = () => {
    const likeIcon = this._cardItem.querySelector(
      Card.CardSelectors.cardHeartClassSelector
    );

    likeIcon.addEventListener("click", () =>
      likeIcon.classList.toggle(Card.CardSelectors.cardActiveHeartClassSelector)
    );
  };

  _setDeleteIconEventListeners = () => {
    const deleteIcon = this._cardItem.querySelector(
      Card.CardSelectors.cardDeleteIconClassSelector
    );
    deleteIcon.addEventListener("click", () => this._cardItem.remove());
  };
}
