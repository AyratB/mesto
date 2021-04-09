const enableValidation = () => {};




//валидация формы редактирования профиля
 //editProfileInputName, editProfileInputDescription






const showInputError = element => element.classList.add('form__input_type_error');

const hideInputError = element => element.classList.remove('form__input_type_error');

const isValid = () => {    
    if(!editProfileInputName.validity.valid){        
        showInputError(editProfileInputName);
    } else{
        hideInputError(editProfileInputName);
    }
}

editProfileInputName.addEventListener('input', isValid);

