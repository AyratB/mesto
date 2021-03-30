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

const createCard = function(cardData){
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
initialCards.forEach(item => cardList.append(createCard(item)));

setAllHeartsHandler();

//попапы
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

//I редактирование профиля
let popupEditProfile = document.querySelector('.popup_type_profile');

//открытие
document.querySelector('.button_type_edit-profile').addEventListener('click', function(){
  preparePopup(popupEditProfile, profileName.textContent, profileDescription.textContent);
  openPopup(popupEditProfile);
});

//закрытие по крестику
popupEditProfile.querySelector('.button_type_close-popup').addEventListener('click', function(){
    closePopup(popupEditProfile);
});

//закрытие по оверлэй
popupEditProfile.querySelector('.popup__overlay').addEventListener('click', function(){
    closePopup(popupEditProfile);
});

//сохранение редактирования
popupEditProfile.addEventListener('submit', editProfileHandler);

function editProfileHandler (evt) {
  evt.preventDefault();

  saveProfile(popupEditProfile);
  closePopup(popupEditProfile);
}

function saveProfile(popup){

  let popupName = popup.querySelector('.popup__input_type_name');
  let popupDescription = popup.querySelector('.popup__input_type_description');

  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
}

//II попап добавления карточки

let popupAddCart = document.querySelector('.popup_type_card');

let addCardButton = document.querySelector('.button_type_add-element');
addCardButton.addEventListener('click', function(){
  openPopup(popupAddCart);
});

//закрытие по крестику
popupAddCart.querySelector('.button_type_close-popup').addEventListener('click', function(){
  closePopup(popupAddCart);
});

//закрытие по оверлэй
popupAddCart.querySelector('.popup__overlay').addEventListener('click', function(){
  closePopup(popupAddCart);
});

//сохранение редактирования
popupAddCart.addEventListener('submit', addCardHandler); 

function addCardHandler (evt) {
  
  evt.preventDefault();

  addCard(popupAddCart);
  clearPopup(popupAddCart)
  closePopup(popupAddCart);
}

function clearPopup(popup){
  popup.querySelector('.popup__input_type_name').value = '';
  popup.querySelector('.popup__input_type_description').value = '';
}

function addCard(popup){

  let cardName = popup.querySelector('.popup__input_type_name').value;
  let cardUrl = popup.querySelector('.popup__input_type_description').value;

  if(cardUrl === '' || !isValidUrl(cardUrl))
  {
    alert('Введите корректный http-адрес');
    return;
  }

  let card = {
    name: cardName,
    link: cardUrl,
  };

  cardList.prepend(createCard(card));

  setAllHeartsHandler();
}

function setAllHeartsHandler(){
  
  const hearts = document.querySelectorAll('.card__heart');  

  hearts.forEach(heartIcon => 
    {
      heartIcon.removeEventListener('click', changeClickStatus);
      heartIcon.addEventListener('click', changeClickStatus);
    });
}

function changeClickStatus(e){
  e.target.classList.toggle('card__heart_active');
}

//проверка на валидность урлы
const isValidUrl = url => /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i.test(url);

//общие функции
function openPopup(popup){
  popup.classList.add('popup_opened');
}

function preparePopup(popup, mainInputValue, descriptionInputValue){
  popup.querySelector('.popup__input_type_name').value = mainInputValue;
  popup.querySelector('.popup__input_type_description').value = descriptionInputValue;
}

function closePopup(popup){
  popup.classList.remove('popup_opened');
}