const popupZoom = document.querySelector('.popup_type_image');


const keyToClose = 'Escape';

const openPopup = popup => {
    popup.classList.add('popup_opened');
  
    //добавление закрытия по Esc
    const popupOverlay = popup.querySelector('.popup__overlay')
    setPopupOverlayEventListeners(popupOverlay);    

    setWindowEventListeners(); 
    
    const submitButton = popup.querySelector('.button[type="submit"]');
    
    if(submitButton)
        makeButtonDisable(submitButton, 'button_inactive');
  
    //для попапа редактирования
    if(popup.classList.contains('popup_type_profile')){
        const inputs = document.querySelector('.form[name="editProfile"]').querySelectorAll('.form__input');
      
        if(inputs.length > 0)
            inputs[0].dispatchEvent(new Event('input', {bubbles: true, cancelable: true,}));        
    }
}

function setPopupOverlayEventListeners(popup){
    popup.addEventListener('click', popupOverlayClickHandler);
}

function removePopupOverlayEventListeners(popup){
    popup.removeEventListener('click', popupOverlayClickHandler);
}

function setWindowEventListeners(){
    window.addEventListener('keyup', escapeCloseHandler);
}

function removeWindowEventListeners(){
    window.removeEventListener('keyup', escapeCloseHandler);
}

const closePopup = popup => {

    popup.classList.remove('popup_opened');
  
    const popupOverlay = popup.querySelector('.popup__overlay')
    removePopupOverlayEventListeners(popupOverlay);    
    
    removeWindowEventListeners();
    
    const form = popup.querySelector('.form');

    if(popup.classList.contains('popup_type_card') && form){
        
        resetForm(form);
    }    
    
    if(form)  
        clearAllFormErrors(form);
}

function clearAllFormErrors(form){
    const inputs = form.querySelectorAll('.form__input');

    inputs.forEach(input => hideInputError(form, input));
}

function hideInputError(form, input){
    const errorElement = form.querySelector(`#${input.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove('form__span-error_active');

    input.classList.remove('form__input_type_error');
}

const resetForm = form => form.reset();

function popupOverlayClickHandler(e){
    
    const openedPopup = e.target.closest('.popup_opened');        
    closePopup(openedPopup);    
}
function escapeCloseHandler(e) {
    if (e.key === keyToClose) {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);     
    }
}

const makeButtonDisable = (button, inactiveButtonClass) => {    
    button.disabled = true;
    button.classList.add(inactiveButtonClass);
} 