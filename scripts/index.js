const cards = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popupZoom = document.querySelector('.popup_type_image');
const popupZoomCloseButton = popupZoom.querySelector('.button_type_close-popup');
const popupZoomOvewrlay = popupZoom.querySelector('.popup__overlay');
let figureImage = popupZoom.querySelector('.figure__image');
let figureCaption = popupZoom.querySelector('.figure__caption');

const popupEditProfile = document.querySelector('.popup_type_profile');
const popupEditProfileCloseButton = popupEditProfile.querySelector('.button_type_close-popup');
const popupEditProfileOverlay = popupEditProfile.querySelector('.popup__overlay');
const popupEditProfileEditButton = document.querySelector('.button_type_edit-profile');

const popupAddCart = document.querySelector('.popup_type_card');
const addCardButton = document.querySelector('.button_type_add-element');
const popupAddCartCloseButton = popupAddCart.querySelector('.button_type_close-popup');
const popupAddCartOverlay = popupAddCart.querySelector('.popup__overlay');

function createCard(cardData){
  
  const cardItem = cardTemplate.cloneNode(true);

  const cardImage = cardItem.querySelector('.card__image');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const cardDescription = cardItem.querySelector('.card__description');
  cardDescription.textContent = cardData.name;

  const likeIcon = cardItem.querySelector('.card__heart');
  likeIcon.addEventListener('click', changeClickStatus);

  const deleteIcon = cardItem.querySelector('.button_type_delete-card');
  deleteIcon.addEventListener('click', () => cardItem.remove());

  cardImage.addEventListener('click', () => handleOpenPicture(cardData));

  return cardItem;
}

const renderCard = (data, wrap) => wrap.prepend(createCard(data));

function handleEditProfile (evt) {
  evt.preventDefault();

  saveProfile(this);
  closePopup(this);
}

function saveProfile(popup){

  const popupName = popup.querySelector('.popup__input_type_name');
  const popupDescription = popup.querySelector('.popup__input_type_description');

  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
}

function handleAddCard(evt) {

  evt.preventDefault();

  addCard(this);
  clearPopup(this);
  closePopup(this);
}

function handleOpenPicture(dataCard){
  prepareZoomPopup(dataCard);
  openPopup(popupZoom);
}

function prepareZoomPopup(dataCard){

  figureImage.src = dataCard.link;
  figureImage.alt = dataCard.name;
  
  figureCaption.textContent = dataCard.name;
}

const clearPopup = popup => popup.querySelector('.popup__form').reset();

function addCard(popup){

  const cardName = popup.querySelector('.popup__input_type_name').value;
  const cardUrl = popup.querySelector('.popup__input_type_description').value;

  if(cardUrl === '' || !isValidUrl(cardUrl)){
    alert('Введите корректный http-адрес!');
    return;
  }

  const card = {
    name: cardName,
    link: cardUrl,
  };

  renderCard(card, cards);
}

function changeClickStatus(){
  this.classList.toggle('card__heart_active');
}

const openPopup = popup => popup.classList.add('popup_opened');
const closePopup = (popup) => popup.classList.remove('popup_opened');

//проверка на валидность урлы
const isValidUrl = url => /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i.test(url);

function preparePopup(popup, mainInputValue, descriptionInputValue){
  popup.querySelector('.popup__input_type_name').value = mainInputValue;
  popup.querySelector('.popup__input_type_description').value = descriptionInputValue;
}

popupEditProfileEditButton.addEventListener('click', function(){
  preparePopup(popupEditProfile, profileName.textContent, profileDescription.textContent);
  openPopup(popupEditProfile);
});

popupEditProfileCloseButton.addEventListener('click', () => closePopup(popupEditProfile));
popupEditProfileOverlay.addEventListener('click', () => closePopup(popupEditProfile));
popupEditProfile.addEventListener('submit', handleEditProfile);

addCardButton.addEventListener('click', () => openPopup(popupAddCart));

popupAddCartCloseButton.addEventListener('click', () => closePopup(popupAddCart));
popupAddCartOverlay.addEventListener('click', () => closePopup(popupAddCart));
popupAddCart.addEventListener('submit', handleAddCard); 

popupZoomCloseButton.addEventListener('click', () => closePopup(popupZoom));
popupZoomOvewrlay.addEventListener('click', () => closePopup(popupZoom));

//инициализация блока с карточками
initialCards.forEach(item => renderCard(item, cards));