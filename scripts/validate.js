const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__span-error_active');

    inputElement.classList.add('form__input_type_error');
}

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove('form__span-error_active');

    inputElement.classList.remove('form__input_type_error');
}

const toggleSaveButton = (inputList, buttonElement) => {  
    debugger;
    if(inputList.some(input => !input.validity.valid)){
        buttonElement.disabled = true;
        
        buttonElement.classList.add('button_inactive');
    } else{
        buttonElement.disabled = false;
        buttonElement.classList.remove('button_inactive');
    }    
}

const clearAllErrors = (form) => 
{
    const inputList = Array.from(form.querySelectorAll('.form__input'));
    inputList.forEach(input => hideInputError(form, input));
}

const checkInputValidity = (formElement, input) => {
    
    if(!input.validity.valid){ //вывод ошибки
        showInputError(formElement, input, input.validationMessage);
    } else{
        hideInputError(formElement, input);
    }    
};

const setEventListeners = formElement => {
    formElement.addEventListener('submit', evt => {
        evt.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll('.form__input'));

    const buttonSave = formElement.querySelector('.button_type_save-form');

    inputList.forEach(input => {
        input.addEventListener('input', () => {
            checkInputValidity(formElement, input);
            toggleSaveButton(inputList, buttonSave);
        });
    });

    toggleSaveButton(inputList, buttonSave);
};

const enableValidation = () => {
    
    const formList = Array.from(document.forms);
    formList.forEach(setEventListeners);
};

enableValidation();

