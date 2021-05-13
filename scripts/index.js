import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { initialCards } from "./initial-cards.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";

const KEY_TO_CLOSE = "Escape";

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const popupEditProfile = document.querySelector(".popup_type_profile");
const editProfileInputName = popupEditProfile.querySelector(
  'input[name="edit-profile-name"]'
);
const editProfileInputDescription = popupEditProfile.querySelector(
  'input[name="edit-profile-description'
);
const popupEditProfileEditButton = document.querySelector(
  ".button_type_edit-profile"
);

const popupAddCart = document.querySelector(".popup_type_card");
const addCardButton = document.querySelector(".button_type_add-element");



const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".button_type_save-form",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__span-error_active",
};

const editProfileForm = document.forms.editProfile;
const editProfileFormValidator = new FormValidator(
  validationConfig,
  editProfileForm
);
editProfileFormValidator.enableValidation();

const addCardForm = document.forms.addCard;
const addCardFormValidator = new FormValidator(validationConfig, addCardForm);
addCardFormValidator.enableValidation();

//+
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  popup.querySelector(".popup__overlay").addEventListener("click", popupOverlayClickHandler);
  window.addEventListener("keyup", escapeCloseHandler);
};

//+
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  popup.querySelector(".popup__overlay").removeEventListener("click", popupOverlayClickHandler);

  window.removeEventListener("keyup", escapeCloseHandler);
};




function openPicture(name, link) {

  const popupZoom = new PopupWithImage(".popup_type_image", name, link);
  popupZoom.open();
}



// Блок Section
const section = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardItem = new Card(data, openPicture);
      const card = cardItem.createCard();

      section.addItem(card);
    },
  },
  ".cards__list"
);

section.renderItems();

// Блок Section



function handleEditProfile(evt) {
  evt.preventDefault();

  saveProfile();

  closePopup(popupEditProfile);
}

function saveProfile() {
  profileName.textContent = editProfileInputName.value;
  profileDescription.textContent = editProfileInputDescription.value;
}

editProfileForm.addEventListener("submit", handleEditProfile);

function handleAddCard(evt) {
  evt.preventDefault();

  addCard();

  addCardForm.reset();

  closePopup(popupAddCart);
}

function addCard() {
  const cardName = addCardForm.querySelector(
    'input[name="add-card-name"]'
  ).value;
  const cardUrl = addCardForm.querySelector('input[name="add-card-url"]').value;

  const cardItem = new Card(
    {
      name: cardName,
      link: cardUrl,
    },
    openPicture
  );

  renderCard(cardItem, cards);
}

function prepareEditPopup(mainInputValue, descriptionInputValue) {
  editProfileInputName.value = mainInputValue;
  editProfileInputDescription.value = descriptionInputValue;
}

popupEditProfileEditButton.addEventListener("click", function () {
  editProfileFormValidator.clearAllFormErrors();

  prepareEditPopup(profileName.textContent, profileDescription.textContent);
  openPopup(popupEditProfile);

  dispatchInputEvent(popupEditProfile);

  editProfileFormValidator.makeButtonDisable();
});

function dispatchInputEvent(popup) {
  const inputs = popup.querySelectorAll(".form__input");

  if (inputs.length > 0)
    inputs[0].dispatchEvent(
      new Event("input", { bubbles: true, cancelable: true })
    );
}

addCardButton.addEventListener("click", () => {
  addCardFormValidator.clearAllFormErrors();
  addCardForm.reset();

  openPopup(popupAddCart);

  addCardFormValidator.makeButtonDisable();
});

addCardForm.addEventListener("submit", handleAddCard);

//+
const closeButtonClickHandler = (e) => {
  const popup = e.target.closest(".popup");
  closePopup(popup);
};

// +
function popupOverlayClickHandler(e) {
  const openedPopup = e.target.closest(".popup_opened");
  closePopup(openedPopup);
}

// +
function escapeCloseHandler(e) {
  if (e.key === KEY_TO_CLOSE) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

//+
const setCloseButtonEventListener = (closeButton) =>
  closeButton.addEventListener("click", closeButtonClickHandler);

//++
Array.from(document.querySelectorAll(".button_type_close-popup")).forEach(
  (closeButton) => setCloseButtonEventListener(closeButton)
);
