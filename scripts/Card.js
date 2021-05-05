class Card {
    constructor(cardData, cardTemplateSelector){
        this._cardData = cardData;
        this._cardTemplateSelector = cardTemplateSelector;
    }

    createCard = () => {
  
        const cardTemplate = document.querySelector(this._cardTemplateSelector).content.querySelector('.card');

        const cardItem = cardTemplate.cloneNode(true);

        this._setCardData(cardItem)
        this._setCardEventListeners(cardItem);
      
        return cardItem;
    }

    _setCardData(cardItem){

        const cardImage = cardItem.querySelector('.card__image');
      
        cardImage.src = this._cardData.link;
        cardImage.alt = this._cardData.name;

        this._setCardImageEventListeners(cardImage);
      
        const cardDescription = cardItem.querySelector('.card__description');
        cardDescription.textContent = this._cardData.name;
    }

    _setCardImageEventListeners = cardImage => cardImage.addEventListener('click', () => this._handleOpenPicture(this._cardData));
        
    _handleOpenPicture(cardData){

        prepareZoomPopupByCardData(cardData);
        openZoomPopup();
    }

    _setCardEventListeners(cardItem){

        const likeIcon = cardItem.querySelector('.card__heart');
        this._setLikeIconEventListeners(likeIcon);
      
        const deleteIcon = cardItem.querySelector('.button_type_delete-card');
        this._setIconEventListeners(deleteIcon, cardItem);
    }

    _setIconEventListeners = (deleteIcon, cardItem) => {
        deleteIcon.addEventListener('click', () => cardItem.remove());
    }

    _likeHeartHandler = likeIcon => likeIcon.classList.toggle('card__heart_active');

    _setLikeIconEventListeners = likeIcon => likeIcon.addEventListener('click', () => this._likeHeartHandler(likeIcon));
}

export {Card};