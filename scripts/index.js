const cards = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popupZoom = document.querySelector('.popup_type_image');
const popupZoomCloseButton = popupZoom.querySelector('.button_type_close-popup');
let figureImage = popupZoom.querySelector('.figure__image');
let figureCaption = popupZoom.querySelector('.figure__caption');

const popupEditProfile = document.querySelector('.popup_type_profile');
const editProfileInputName = popupEditProfile.querySelector('input[name="edit-profile-name"]');
const editProfileInputDescription = popupEditProfile.querySelector('input[name="edit-profile-description');
const popupEditProfileCloseButton = popupEditProfile.querySelector('.button_type_close-popup');
const popupEditProfileEditButton = document.querySelector('.button_type_edit-profile');

const popupAddCart = document.querySelector('.popup_type_card');
const addCardButton = document.querySelector('.button_type_add-element');
const popupAddCartCloseButton = popupAddCart.querySelector('.button_type_close-popup');

//формы
const editProfileForm = document.forms.editProfile;
const addCardForm = document.forms.addCard;

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

  saveProfile();
  closePopup(popupEditProfile);
}

function saveProfile(){
  profileName.textContent = editProfileInputName.value;
  profileDescription.textContent = editProfileInputDescription.value;
}

editProfileForm.addEventListener('submit', handleEditProfile);

function handleAddCard(evt) {

  evt.preventDefault();

  addCard();
  clearForm(addCardForm);
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

const clearForm = form => form.reset();

function addCard(){

  const cardName = addCardForm.querySelector('input[name="add-card-name"]').value;
  const cardUrl = addCardForm.querySelector('input[name="add-card-url"]').value;

  const card = {
    name: cardName,
    link: cardUrl,
  };

  renderCard(card, cards);
}

function changeClickStatus(){
  this.classList.toggle('card__heart_active');
}

const openPopup = popup => {
  popup.classList.add('popup_opened');
  
  function escapeCloseHandler(e) {
    if (e.key === 'Escape') {
      closePopup(popup);
      window.removeEventListener('keyup', escapeCloseHandler); 
    }
  }

  //добавление закрытия по Esc
  popup.querySelector('.popup__overlay').addEventListener('click', () => closePopup(popup));

  window.addEventListener('keyup', escapeCloseHandler);

  //инициация события для заполненной изначально формы
  const inputList = Array.from(popup.querySelectorAll('.form__input'));

  if(popup.classList.contains('popup_type_profile') && inputList.length > 0)
    inputList[0].dispatchEvent(new Event("input"));
}

const clearFormErrors = (popup, formClearConfig) => {

  const form = popup.querySelector('.form');
  if(form)
    clearAllErrors(form, formClearConfig);
}


const closePopup = (popup) => {
  popup.classList.remove('popup_opened');

  popup.querySelector('.popup__overlay').removeEventListener('click', () => closePopup(popup));

  clearFormErrors(popup, { 
    inputSelector: '.form__input',  
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__span-error_active',
  });
}

function preparePopup(mainInputValue, descriptionInputValue){
  editProfileInputName.value = mainInputValue;
  editProfileInputDescription.value = descriptionInputValue;
}

popupEditProfileEditButton.addEventListener('click', function(){
  preparePopup(profileName.textContent, profileDescription.textContent);
  openPopup(popupEditProfile);
});

popupEditProfileCloseButton.addEventListener('click', () => closePopup(popupEditProfile));

addCardButton.addEventListener('click', () => openPopup(popupAddCart));

popupAddCartCloseButton.addEventListener('click', () => closePopup(popupAddCart));
popupAddCart.addEventListener('submit', handleAddCard); 

popupZoomCloseButton.addEventListener('click', () => closePopup(popupZoom));

//инициализация блока с карточками
initialCards.forEach(item => renderCard(item, cards));