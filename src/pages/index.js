
import { apiUserData } from "../utils/apiUserData.js";

import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

import { Api } from "../components/Api.js";

import "../pages/index.css";
//импорты

//константы
const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".button_type_save-form",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__span-error_active",
};

const addCardFormValidator = new FormValidator(
  validationConfig,
  document.forms.addCard
);

const editProfileFormValidator = new FormValidator(
  validationConfig,
  document.forms.editProfile
);

const addNewCardButton = document.querySelector(".button_type_add-element");
const popupEditProfileEditButton = document.querySelector(
  ".button_type_edit-profile"
);

const section = new Section(".cards__list");

const popupAddCart = new PopupWithForm({
  popupSelector: ".popup_type_card",
  submitFormCb: (formData) => {
    section.addItem(
      returnCard({
        name: formData["add-card-name"],
        link: formData["add-card-url"],
      })
    );
    popupAddCart.close();
  },
});

popupAddCart.setEventListeners();

const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileDescriptionSelector: ".profile__description",
});

const popupEditForm = new PopupWithForm({
  popupSelector: ".popup_type_profile",

  submitFormCb: (formData) => {
    userInfo.setUserInfo(
      formData["edit-profile-name"],
      formData["edit-profile-description"]
    );
    popupEditForm.close();
  },
});

popupEditForm.setEventListeners();

const popupEditProfile = document.querySelector(".popup_type_profile");
const editProfileInputName = popupEditProfile.querySelector(
  'input[name="edit-profile-name"]'
);
const editProfileInputDescription = popupEditProfile.querySelector(
  'input[name="edit-profile-description'
);

const popupZoom = new PopupWithImage(".popup_type_image");
popupZoom.setEventListeners();
//константы

const api = new Api(
  {
    baseUrl: `${apiUserData.ariBaseUrl}/${apiUserData.userGroupNumber}`,
    headers: {
      authorization: apiUserData.userAuthorizationToken,
      "Content-Type": apiUserData.apiContentType,
    },
  },
  (cardsData) => {
    cardsData.forEach((cardData) => {
      section.addItem(
        returnCard({
          name: cardData["name"],
          link: cardData["link"],
        })
      );
    });
  }
);

//отрисовка карточек через Api
api.getInitialCards();

addCardFormValidator.enableValidation();

addNewCardButton.addEventListener("click", handleAddNewCardButton);

function returnCard(data) {
  const cardItem = new Card(data, handleCardClick, "#card-template");
  const card = cardItem.createCard();
  return card;
}

function handleAddNewCardButton() {
  addCardFormValidator.clearAllFormErrors();

  popupAddCart.open();

  addCardFormValidator.makeButtonDisable();
}

editProfileFormValidator.enableValidation();

popupEditProfileEditButton.addEventListener("click", () => {
  editProfileFormValidator.clearAllFormErrors();

  getProfileData(userInfo);

  popupEditForm.open();

  dispatchInputEvent(popupEditForm.form);

  editProfileFormValidator.makeButtonDisable();
});

function getProfileData(userInfo) {
  const { profileName, profileDescription } = userInfo.getUserInfo();

  editProfileInputName.value = profileName;
  editProfileInputDescription.value = profileDescription;
}

function dispatchInputEvent(form) {
  const inputs = form.querySelectorAll(".form__input");

  if (inputs.length > 0)
    inputs[0].dispatchEvent(
      new Event("input", { bubbles: true, cancelable: true })
    );
}

function handleCardClick(name, link) {
  popupZoom.open(name, link);
}
