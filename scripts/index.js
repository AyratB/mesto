let formElement = document.querySelector('.popup');
let popupName = document.querySelector('#popup-name');
let popupDescription = document.querySelector('#popup-description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let cardList = document.querySelector('.cards__list'); 

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const addCardToList = function(cardData){
    const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
    const cardItem = cardTemplate.cloneNode(true);

    const cardImage = cardItem.querySelector('.card__image');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    const cardDescription = cardItem.querySelector('.card__description');
    cardDescription.textContent = cardData.name;

    return cardItem;
}

//инициализация блока с карточками   
initialCards.forEach(item => cardList.append(addCardToList(item)));

function closePopup(){
    formElement.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler); 

function openPopup(){
    
    popupName.value = profileName.textContent;
    popupDescription.value = profileDescription.textContent;

    formElement.classList.add('popup_opened');
}

let profileEditButton = document.querySelector('.button_type_edit-profile');
profileEditButton.addEventListener('click', openPopup);

let closePopupButton = document.querySelector('.button_type_close-popup');
closePopupButton.addEventListener('click', closePopup);

let popupOverlay = document.querySelector('.popup__overlay');
popupOverlay.addEventListener('click', closePopup);