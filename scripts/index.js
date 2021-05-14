import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { initialCards } from "./initial-cards.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

const section = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardItem = new Card(data, handleCardClick);
      const card = cardItem.createCard();

      section.addItem(card);
    },
  },
  ".cards__list"
);

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

section.renderItems();

addCardFormValidator.enableValidation();

addNewCardButton.addEventListener("click", handleAddNewCardButton);

function handleAddNewCardButton() {
  addCardFormValidator.clearAllFormErrors();

  const popupAddCart = new PopupWithForm({
    popupSelector: ".popup_type_card",
    submitFormCb: (evt, name, description) => {
      evt.preventDefault();

      const card = createCard(name, description);

      section.addItem(card);

      popupAddCart.close();
    },
  });

  popupAddCart.open();

  addCardFormValidator.makeButtonDisable();
}

function createCard(name, description) {
  const cardItem = new Card(
    {
      name: name,
      link: description,
    },
    handleCardClick
  );

  const card = cardItem.createCard();

  return card;
}

editProfileFormValidator.enableValidation();

popupEditProfileEditButton.addEventListener("click", () => {
  editProfileFormValidator.clearAllFormErrors();

  const userInfo = new UserInfo({
    profileNameSelector: ".profile__name",
    profileDescriptionSelector: ".profile__description",
  });

  getProfileData(userInfo);

  const popupEditForm = new PopupWithForm({
    popupSelector: ".popup_type_profile",

    submitFormCb: (evt, name, description) => {
      evt.preventDefault();
      userInfo.setUserInfo(name, description);
      popupEditForm.close();
    },
  });

  popupEditForm.open();

  dispatchInputEvent(popupEditForm.form);

  editProfileFormValidator.makeButtonDisable();
});

function getProfileData(userInfo) {
  const popupEditProfile = document.querySelector(".popup_type_profile");
  const editProfileInputName = popupEditProfile.querySelector(
    'input[name="edit-profile-name"]'
  );
  const editProfileInputDescription = popupEditProfile.querySelector(
    'input[name="edit-profile-description'
  );

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
  const popupZoom = new PopupWithImage(".popup_type_image", name, link);
  popupZoom.open();
}
