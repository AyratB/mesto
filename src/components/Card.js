export class Card {
  static CardSelectors = {
    cardImageClassSelector: ".card__image",
    cardHeartClassSelector: ".card__heart",
    cardDeleteIconClassSelector: ".button_type_delete-card",
    cardDescriptionClassSelector: ".card__description",
    cardClassSelector: ".card",
    cardActiveHeartClass: "card__heart_active",
    cardHeartVoicesClassSelector: ".card__heart-voices",
    hiddenButtonClass: "button_hidden",
  };

  constructor({
    cardData,
    handleCardClick,
    cardTemplateClassSelector,
    handleDeleteIconClick,
    currentOwner
  }) {
    
    this._cardData = cardData;
    this._handleCardClick = handleCardClick;
    this._cardTemplateClassSelector = cardTemplateClassSelector;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._cardOwner = cardData.owner;
    this._currentOwner = currentOwner;    
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

    this._cardHeartVoices = this._cardItem.querySelector(
      Card.CardSelectors.cardHeartVoicesClassSelector
    );

    this._setCardData();
    this._setCardEventListeners();

    this._countHeartVoices();

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

  _countHeartVoices = () => {
    this._cardHeartVoices.textContent = this._cardData.likes.length;
  };

  _handleOpenPicture = (name, link) => this._handleCardClick(name, link);

  _setCardEventListeners() {
    this._setCardImageEventListeners();
    this._setLikeIconEventListeners();
    this._setDeleteIconEventListeners();
  }

  _setLikeIconEventListeners = () => {
    this._likeIcon.addEventListener("click", () =>
      this._likeIcon.classList.toggle(Card.CardSelectors.cardActiveHeartClass)
    );
  };

  _setDeleteIconEventListeners = () => {

    if(JSON.stringify(this._cardOwner) === JSON.stringify(this._currentOwner)){      
      this._deleteIcon.classList.remove(Card.CardSelectors.hiddenButtonClass);
    }    

    this._deleteIcon.addEventListener("click", () =>
      this._handleDeleteIconClick(this._cardItem)
    );
  };
}
