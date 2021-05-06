export class FormValidator {
    constructor(validationConfig, form) {
        this._validationConfig = validationConfig;
        this._form = form;
        this._buttonSubmit = this._form.querySelector(this._validationConfig.submitButtonSelector);
        this._inputs = Array.from(this._form.querySelectorAll(this._validationConfig.inputSelector));
    }

    enableValidation() { 
        this._setFormsEventListeners();
    }

    _setFormsEventListeners = () => {
        this._form.addEventListener('submit', this._submitFormHandler);
        this._form.addEventListener('input', this._inputFormHandler);
    }

    _submitFormHandler = e => e.preventDefault(); 

    _checkInputValidity = input => {

        if(input.validity.valid){
            this._hideInputError(input);
        } else{
            this._showInputError(input);
        }
    }

    _hideInputError = input => {
        const errorElement = this._form.querySelector(`#${input.id}-error`);
        errorElement.textContent = '';
        errorElement.classList.remove('form__span-error_active');
    
        input.classList.remove('form__input_type_error');
    }

    _showInputError = input => {
        const errorElement = this._form.querySelector(`#${input.id}-error`);
        errorElement.textContent = input.validationMessage;
        errorElement.classList.add(this._validationConfig.errorClass);
    
        input.classList.add(this._validationConfig.inputErrorClass);
    }

    _inputFormHandler = e => {
        
        const input = e.target;

        this._checkInputValidity(input);
        this._toggleSaveButton(this._buttonSubmit);
    };
    
    _toggleSaveButton = button => {

        if(this._inputs.some(input => !input.validity.valid)) {
            this.makeButtonDisable(button);
        } else {
            this._makeButtonNotDisable(button);
        }
    }
    
    _makeButtonNotDisable = button => {
        button.disabled = false;
        button.classList.remove(this._validationConfig.inactiveButtonClass);
    }

    makeButtonDisable = button => {    
        button.disabled = true;
        button.classList.add(this._validationConfig.inactiveButtonClass);
    } 

    clearAllFormErrors = () => this._inputs.forEach(input => this._hideInputError(input));        
}