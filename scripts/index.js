let formElement = document.querySelector('.popup');
let popupName = document.querySelector('#popup-name');
let popupDescription = document.querySelector('#popup-description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = popupName.value;
    profileDescription.textContent = popupDescription.value;
    
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler); 

function openPopup(){
    
    popupName.value = profileName.textContent;
    popupDescription.value = profileDescription.textContent;

    formElement.classList.add('popup_opened');
}
  
function closePopup(){
    formElement.classList.remove('popup_opened');
}

let profileEditButton = document.querySelector('.button_type_edit-profile');
profileEditButton.addEventListener('click', openPopup);

let closePopupButton = document.querySelector('.popup__close');
closePopupButton.addEventListener('click', closePopup);

let popupOverlay = document.querySelector('.popup__overlay');
popupOverlay.addEventListener('click', closePopup);