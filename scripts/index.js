import {FormValidator} from "./FormValidator.js";
import { Card } from "./Card.js";

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popupZoom = document.querySelector('.popup_type_image');

const popupEditProfile = document.querySelector('.popup_type_profile');
const editProfileInputName = popupEditProfile.querySelector('input[name="edit-profile-name"]');
const editProfileInputDescription = popupEditProfile.querySelector('input[name="edit-profile-description');

const popupEditProfileEditButton = document.querySelector('.button_type_edit-profile');

const popupAddCart = document.querySelector('.popup_type_card');
const addCardButton = document.querySelector('.button_type_add-element');

//формы
const editProfileForm = document.forms.editProfile;
const addCardForm = document.forms.addCard;

//валидация форм
const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.button_type_save-form',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__span-error_active',
};

const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));

forms.forEach(form => {
  const formValidator = new FormValidator(validationConfig, form);
  
  formValidator.enableValidation();
});

//инициализация блока с карточками
const cards = document.querySelector('.cards__list');
const cardTemplateSelector = '#card-template';

function renderCard(cardItem, wrap){
  
  const card = cardItem.createCard();
  wrap.prepend(card)
};

function initCards(initialCards, wrap){
  
  initialCards.forEach(data => {
    
    const cardItem = new Card(data, cardTemplateSelector);    
    renderCard(cardItem, wrap);    
  });
}

initCards(initialCards, cards);

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
  resetForm(addCardForm); 

  closePopup(this);
}

function addCard(){

  const cardName = addCardForm.querySelector('input[name="add-card-name"]').value;
  const cardUrl = addCardForm.querySelector('input[name="add-card-url"]').value;

  const cardItem = new Card({
    name: cardName,
    link: cardUrl,
  }, cardTemplateSelector);

  renderCard(cardItem, cards);
}

function preparePopup(mainInputValue, descriptionInputValue){
  editProfileInputName.value = mainInputValue;
  editProfileInputDescription.value = descriptionInputValue;
}

popupEditProfileEditButton.addEventListener('click', function(){
  preparePopup(profileName.textContent, profileDescription.textContent);
  openPopup(popupEditProfile);
});

addCardButton.addEventListener('click', () => openPopup(popupAddCart));
popupAddCart.addEventListener('submit', handleAddCard); 

const closeButtonClickHandler = e => {
  
  const popup = e.target.closest('.popup');
  closePopup(popup);
}

const setCloseButtonEventListener = closeButton => closeButton.addEventListener('click', closeButtonClickHandler);

Array.from(document.querySelectorAll('.button_type_close-popup')).forEach(closeButton => setCloseButtonEventListener(closeButton));
