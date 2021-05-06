export class Card {
    constructor(cardData, cardTemplateSelector, openPopupFunction){
        this._cardData = cardData;
        this._cardTemplateSelector = cardTemplateSelector;
        this._openPopupFunction = openPopupFunction;
    }

    createCard = () => {
  
        this._cardItem = this._getTemplate();

        this._cardImage = this._cardItem.querySelector('.card__image');
        this._cardImage.src = this._cardData.link;
        this._cardImage.alt = this._cardData.name;

        this._likeIcon = this._cardItem.querySelector('.card__heart');
        this._deleteIcon = this._cardItem.querySelector('.button_type_delete-card');
        this._cardDescription = this._cardItem.querySelector('.card__description');

        this._setCardData()
        this._setCardEventListeners();
      
        return this._cardItem;
    }

    _getTemplate(){
        const cardTemplate = document.querySelector(this._cardTemplateSelector).content.querySelector('.card');
        return cardTemplate.cloneNode(true);
    }

    _setCardData(){
        this._setCardImageEventListeners();
        this._cardDescription.textContent = this._cardData.name;
    }

    _setCardImageEventListeners = () => this._cardImage.addEventListener('click', () => this._handleOpenPicture(this._cardData.name, this._cardData.link));
        
    _handleOpenPicture = (name, link) => this._openPopupFunction(name, link);    

    _setCardEventListeners(){
        this._setLikeIconEventListeners();
        this._setIconEventListeners();
    }

    _setLikeIconEventListeners = () => this._likeIcon.addEventListener('click', this._likeHeartHandler);

    _likeHeartHandler = () => this._likeIcon.classList.toggle('card__heart_active');

    _setIconEventListeners = () => this._deleteIcon.addEventListener('click', () => this._cardItem.remove());
}