const showInputError = (formElement, inputElement, inputErrorClass, errorClass, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);

    inputElement.classList.add(inputErrorClass);
}

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);

    inputElement.classList.remove(inputErrorClass);
}

const makeButtonDisable = (buttonElement, inactiveButtonClass) => {
    buttonElement.disabled = true;        
    buttonElement.classList.add(inactiveButtonClass);
}

function makeButtonNotDisable (buttonElement, inactiveButtonClass) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
}

const toggleSaveButton = (inputList, buttonElement, inactiveButtonClass) => {
    
    if(inputList.some(input => !input.validity.valid)){
        makeButtonDisable(buttonElement, inactiveButtonClass);
    } else{
        makeButtonNotDisable(buttonElement, inactiveButtonClass);
    }    
}

const clearAllErrors = (form, inputSelector, inputErrorClass, errorClass) => 
{
    const inputList = Array.from(form.querySelectorAll(inputSelector));
    inputList.forEach(input => hideInputError(form, input, inputErrorClass, errorClass));
}

const checkInputValidity = (formElement, input, inputErrorClass, errorClass) => {
    
    if(!input.validity.valid){
        showInputError(formElement, input, inputErrorClass, errorClass, input.validationMessage);
    } else{
        hideInputError(formElement, input, inputErrorClass, errorClass);
    }    
};

const inputHandler = (formElement, input, inputErrorClass, errorClass, inputList, buttonSave, inactiveButtonClass) => {
    checkInputValidity(formElement, input, inputErrorClass, errorClass);
    toggleSaveButton(inputList, buttonSave, inactiveButtonClass);
}

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {

    formElement.addEventListener('submit', evt => evt.preventDefault());

    const inputList = Array.from(formElement.querySelectorAll(inputSelector));

    const buttonSave = formElement.querySelector(submitButtonSelector);

    inputList.forEach(input => {
        input.addEventListener('input', () => inputHandler(formElement, input, inputErrorClass, errorClass,inputList, buttonSave, inactiveButtonClass));
    });

    toggleSaveButton(inputList, buttonSave, inactiveButtonClass);
};

const enableValidation = ({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
  }) => {
    
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((form) => {
        setEventListeners(form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
    });
};

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.button_type_save-form',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__span-error_active',
  });

