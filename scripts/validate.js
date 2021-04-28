const showInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(validationConfig.errorClass);

    inputElement.classList.add(validationConfig.inputErrorClass);
}

const hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(validationConfig.errorClass);

    inputElement.classList.remove(validationConfig.inputErrorClass);
}

const makeButtonDisable = (buttonElement, validationConfig) => {
    buttonElement.disabled = true;        
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
}

const makeButtonNotDisable = (buttonElement, validationConfig) => {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
}

const toggleSaveButton = (inputList, buttonElement, validationConfig) => {
    
    if(inputList.some(input => !input.validity.valid)){
        makeButtonDisable(buttonElement, validationConfig);
    } else{
        makeButtonNotDisable(buttonElement, validationConfig);
    }    
}

const clearAllErrors = (form, formClearConfig) => 
{
    const inputList = Array.from(form.querySelectorAll(formClearConfig.inputSelector));
    inputList.forEach(input => hideInputError(form, input, formClearConfig));
}

const checkInputValidity = (formElement, input, validationConfig) => {
    
    if(input.validity.valid){
        hideInputError(formElement, input, validationConfig);
    } else{        
        showInputError(formElement, input, validationConfig);
    }    
};

const inputHandler = (inputList, buttonSave, formElement, input, validationConfig) => {
    checkInputValidity(formElement, input, validationConfig);
    toggleSaveButton(inputList, buttonSave, validationConfig);
}

const setEventListeners = (formElement, validationConfig) => {

    formElement.addEventListener('submit', evt => evt.preventDefault());

    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));

    const buttonSave = formElement.querySelector(validationConfig.submitButtonSelector);

    inputList.forEach(input => {
        input.addEventListener('input', () => inputHandler(inputList, buttonSave, formElement, input, validationConfig));
    });

    toggleSaveButton(inputList, buttonSave, validationConfig.inactiveButtonClass);
};

const enableValidation = validationConfig => {   

    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach(form => {
        setEventListeners(form, validationConfig);
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

