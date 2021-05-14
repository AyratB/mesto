import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { initialCards } from "./initial-cards.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";


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

const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".button_type_save-form",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__span-error_active",
};




const editProfileForm = document.forms.editProfile;

editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  saveProfile();

  closePopup(popupEditProfile);
});

const editProfileFormValidator = new FormValidator(
  validationConfig,
  editProfileForm
);

editProfileFormValidator.enableValidation();


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




const addCardForm = document.forms.addCard;

const addCardFormValidator = new FormValidator(validationConfig, addCardForm);
addCardFormValidator.enableValidation();

const addNewCardButton = document.querySelector(".button_type_add-element");

addNewCardButton.addEventListener("click", () => {  

  addCardFormValidator.clearAllFormErrors();

  const popupAddCart = new PopupWithForm({ 
    popupSelector: ".popup_type_card", 
    submitFormCb: (evt, name, description) => {
      evt.preventDefault();

      const cardItem = new Card(
        {
          name: name,
          link: description,

          // name: addCardForm.querySelector('input[name="add-card-name"]').value,
          // link: addCardForm.querySelector('input[name="add-card-url"]').value,
        },
        openPicture
      );
    
      section.addItem(cardItem);
      
      popupAddCart.close(); //closePopup(popupAddCart);      
  }});

  popupAddCart.open(); //openPopup(popupAddCart); 

  addCardFormValidator.makeButtonDisable();
});








const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");


function saveProfile() {
  profileName.textContent = editProfileInputName.value;
  profileDescription.textContent = editProfileInputDescription.value;
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

//оставить
function openPicture(name, link) {

  const popupZoom = new PopupWithImage(".popup_type_image", name, link);
  popupZoom.open();
}







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
