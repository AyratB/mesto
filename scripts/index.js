import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { initialCards } from "./initial-cards.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";

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

const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".button_type_save-form",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__span-error_active",
};

const addCardFormValidator = new FormValidator(validationConfig, document.forms.addCard);
const editProfileFormValidator = new FormValidator(
  validationConfig,
  document.forms.editProfile
);

const addNewCardButton = document.querySelector(".button_type_add-element");
const popupEditProfileEditButton = document.querySelector(
  ".button_type_edit-profile"
);

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(
  ".profile__description"
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
    openPicture
  );

  const card = cardItem.createCard();

  return card;
}

editProfileFormValidator.enableValidation();

popupEditProfileEditButton.addEventListener("click", () => {
  editProfileFormValidator.clearAllFormErrors();  

  getProfileData();  

  const popupEditForm = new PopupWithForm({
    popupSelector: ".popup_type_profile",

    submitFormCb: (evt, name, description) => {
      evt.preventDefault();
      
      setProfileData(name, description);

      popupEditForm.close();
    },
  });

  popupEditForm.open();

  dispatchInputEvent(popupEditForm.form);

  editProfileFormValidator.makeButtonDisable();
});

function getProfileData(){
  const popupEditProfile = document.querySelector(".popup_type_profile");
  const editProfileInputName = popupEditProfile.querySelector(
    'input[name="edit-profile-name"]'
  );
  editProfileInputName.value = profileName.textContent;

  const editProfileInputDescription = popupEditProfile.querySelector(
    'input[name="edit-profile-description'
  );
  editProfileInputDescription.value = profileDescription.textContent;
}

function setProfileData(name, description){
  profileName.textContent = name;      
  profileDescription.textContent = description;
}

function dispatchInputEvent(form) {

  const inputs = form.querySelectorAll(".form__input");

  if (inputs.length > 0)
    inputs[0].dispatchEvent(
      new Event("input", { bubbles: true, cancelable: true })
    );
}

function openPicture(name, link) {
  const popupZoom = new PopupWithImage(".popup_type_image", name, link);
  popupZoom.open();
}