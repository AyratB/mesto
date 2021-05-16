export class Card {
  static CardSelectors = {
    cardImageClassSelector: ".card__image",
    cardHeartClassSelector: ".card__heart",
    cardDeleteIconClassSelector: ".button_type_delete-card",
    cardDescriptionClassSelector: ".card__description",
    cardClassSelector: ".card",
    cardActiveHeartClassSelector: "card__heart_active",
  };

  constructor(cardData, handleCardClick, cardTemplateClassSelector) {
    this._cardData = cardData;
    this._handleCardClick = handleCardClick;
    this._cardTemplateClassSelector = cardTemplateClassSelector;
  }

  createCard = () => {
    this._cardItem = this._getTemplate();

    this._likeIcon = this._cardItem.querySelector(
      Card.CardSelectors.cardHeartClassSelector
    );

    this._deleteIcon = this._cardItem.querySelector(
      Card.CardSelectors.cardDeleteIconClassSelector
    );

    this._cardImage = this._cardItem.querySelector(
      Card.CardSelectors.cardImageClassSelector
    );
    this._cardImage.src = this._cardData.link;
    this._cardImage.alt = this._cardData.name;

    this._cardDescription = this._cardItem.querySelector(
      Card.CardSelectors.cardDescriptionClassSelector
    );

    this._setCardData();
    this._setCardEventListeners();

    return this._cardItem;
  };

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardTemplateClassSelector)
      .content.querySelector(Card.CardSelectors.cardClassSelector);

    return cardTemplate.cloneNode(true);
  }

  _setCardData() {
    this._cardDescription.textContent = this._cardData.name;
  }

  _setCardImageEventListeners = () => {
    this._cardImage.addEventListener("click", () =>
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
    this._likeIcon.addEventListener("click", () =>
      this._likeIcon.classList.toggle(
        Card.CardSelectors.cardActiveHeartClassSelector
      )
    );
  };

  _setDeleteIconEventListeners = () => {
    this._deleteIcon.addEventListener("click", () => this._cardItem.remove());
  };
}
