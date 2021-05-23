import { apiUserData } from "../utils/apiUserData.js";

import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";

import "../pages/index.css";

const profileAvatar = document.querySelector(".profile__avatar");

const editProfileInputName = document.querySelector(
  'input[name="edit-profile-name"]'
);
const editProfileInputDescription = document.querySelector(
  'input[name="edit-profile-description'
);

let currentUser = null;

const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileDescriptionSelector: ".profile__description",
});

const section = new Section(
  {
    renderer: (data) => section.addItem(returnCard(data)),
  },
  ".cards__list"
);

const api = new Api({
  baseUrl: `${apiUserData.ariBaseUrl}/${apiUserData.userGroupNumber}`,
  headers: {
    authorization: apiUserData.userAuthorizationToken,
    "Content-Type": apiUserData.apiContentType,
  },
});

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

const changeAvatarFormValidator = new FormValidator(
  validationConfig,
  document.forms.updateAvatar
);

//кнопки
const addNewCardButton = document.querySelector(".button_type_add-element");

const popupEditProfileEditButton = document.querySelector(
  ".button_type_edit-profile"
);

const buttonChangeAvatarProfile = document.querySelector(
  ".button_type_change-avatar"
);
//кнопки

//попапы
const popupAddCart = new PopupWithForm({
  popupSelector: ".popup_type_card",
  submitFormCb: (formData) => {
    popupAddCart.buttonSubmit.textContent = "Сохранение...";
    api
      .addNewCard({
        cardName: formData["add-card-name"],
        cardLink: formData["add-card-url"],
      })
      .then((newCardData) => {
        section.addItem(returnCard(newCardData));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupAddCart.buttonSubmit.textContent = "Создать";
        popupAddCart.close();
      });
  },
});

const popupEditForm = new PopupWithForm({
  popupSelector: ".popup_type_profile",

  submitFormCb: (formData) => {
    popupEditForm.buttonSubmit.textContent = "Сохранение...";

    api
      .editUserInfo({
        newName: formData["edit-profile-name"],
        newAbout: formData["edit-profile-description"],
      })
      .then((user) => {
        userInfo.setUserInfo(user["name"], user["about"]);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupEditForm.buttonSubmit.textContent = "Сохранить";
        popupEditForm.close();
      });
  },
});

const popupZoom = new PopupWithImage(".popup_type_image");

const popupChangeAvatar = new PopupWithForm({
  popupSelector: ".popup_type_avatar",

  submitFormCb: (formData) => {
    popupChangeAvatar.buttonSubmit.textContent = "Сохранение...";

    api
      .changeAvatar({ newAvatarLink: formData["update-avatar-url"] })
      .then((data) => {
        profileAvatar.src = data.avatar;
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupChangeAvatar.buttonSubmit.textContent = "Сохранить";
        popupChangeAvatar.close();
      });
  },
});

let popupAskDeleteCard = null;
//попапы

//функции
function makeButtonChangeAvatarProfileVisible() {
  buttonChangeAvatarProfile.style.visibility = "visible";
  buttonChangeAvatarProfile.style.opacity = "1";
  buttonChangeAvatarProfile.addEventListener(
    "mouseout",
    makeButtonChangeAvatarProfileUnvisible
  );
}

function makeButtonChangeAvatarProfileUnvisible() {
  buttonChangeAvatarProfile.style.visibility = "hidden";
  buttonChangeAvatarProfile.style.opacity = "0";
  buttonChangeAvatarProfile.removeEventListener(
    "mouseout",
    makeButtonChangeAvatarProfileUnvisible
  );
}

function returnCard(data) {
  const cardItem = new Card({
    cardData: data,
    handleCardClick: handleCardClick,
    cardTemplateClassSelector: "#card-template",
    handleDeleteIconClick: () => handleDeleteIconClick(cardItem),
    currentOwner: currentUser,

    handlerLikeAdd: () => {
      api
        .addLike({ cardId: data._id })
        .then((res) => {
          cardItem.addLike();
          cardItem.countHeartVoices(res.likes.length);
        })
        .catch((err) => console.log(err));
    },

    handlerLikeRemove: () => {
      api
        .removeLike({ cardId: data._id })
        .then((res) => {
          cardItem.removeLike();
          cardItem.countHeartVoices(res.likes.length);
        })
        .catch((err) => console.log(err));
    },
  });

  return cardItem.createCard();
}

function handleDeleteIconClick(cardItem) {
  popupAskDeleteCard = new PopupWithForm({
    popupSelector: ".popup_type_submit",
    submitFormCb: () => {
      api
        .deleteCard({ cardId: cardItem.getCardId() })
        .then(() => {
          cardItem.remove();
        })
        .catch((err) => console.log(err))
        .finally(() => popupAskDeleteCard.close());
    },
  });

  popupAskDeleteCard.setEventListeners();
  popupAskDeleteCard.open();
}

function handleAddNewCardButton() {
  addCardFormValidator.clearAllFormErrors();
  addCardFormValidator.makeButtonDisable();
  popupAddCart.open();  
}

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

//функционал
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cardsData]) => {
    currentUser = user;
    userInfo.setUserInfo(user["name"], user["about"]);
    profileAvatar.src = user["avatar"];

    section.renderItems(cardsData);
  })
  .catch((err) => console.log(err));

//активация попапов
popupAddCart.setEventListeners();
popupEditForm.setEventListeners();
popupZoom.setEventListeners();
popupChangeAvatar.setEventListeners();
//активация попапов

//валидация форм
addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
changeAvatarFormValidator.enableValidation();
//валидация форм

//обработчики событий кнопок
addNewCardButton.addEventListener("click", handleAddNewCardButton);

buttonChangeAvatarProfile.addEventListener("click", () => {
  changeAvatarFormValidator.clearAllFormErrors();
  changeAvatarFormValidator.makeButtonDisable();
  popupChangeAvatar.open();  
});

popupEditProfileEditButton.addEventListener("click", () => {
  editProfileFormValidator.clearAllFormErrors();
  editProfileFormValidator.makeButtonDisable();

  getProfileData(userInfo);

  popupEditForm.open();

  dispatchInputEvent(popupEditForm.form);  
});

profileAvatar.addEventListener(
  "mouseover",
  makeButtonChangeAvatarProfileVisible
);
