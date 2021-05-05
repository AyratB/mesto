class FormValidator {
    constructor(validationConfig, form) {
        this._validationConfig = validationConfig;
        this._form = form;
    }

    enableValidation() { 
        this._setFormsEventListeners(this._form);
    }

    _setFormsEventListeners = form => {
        form.addEventListener('submit', this._submitFormHandler);
        
        form.addEventListener('input', this._inputFormHandler);

    }

    _submitFormHandler = e => e.preventDefault(); 

    _checkInputValidity = (form, input) => {

        if(input.validity.valid){
            this._hideInputError(form, input);
        } else{        
            this._showInputError(form, input);
        }    
    }    

    _hideInputError = (form, input) => hideInputError(form, input); 

    _showInputError = (form, input) => {
        const errorElement = form.querySelector(`#${input.id}-error`);
        errorElement.textContent = input.validationMessage;
        errorElement.classList.add(this._validationConfig.errorClass);
    
        input.classList.add(this._validationConfig.inputErrorClass);
    }

    _inputFormHandler = e => {
        
        const input = e.target;
        const form = e.currentTarget;

        this._checkInputValidity(form, input);

        const buttonSubmit = form.querySelector(this._validationConfig.submitButtonSelector);
        
        this._toggleSaveButton(form, buttonSubmit);
    };
    
    _toggleSaveButton = (form, button) => {
        
        const inputs = Array.from(form.querySelectorAll(this._validationConfig.inputSelector));

        if(inputs.some(input => !input.validity.valid)) {
            makeButtonDisable(button, this._validationConfig.inactiveButtonClass);
        } else {
            this._makeButtonNotDisable(button);
        }    
    }
    
    _makeButtonNotDisable = button => {
        button.disabled = false;
        button.classList.remove(this._validationConfig.inactiveButtonClass);
    }  
}

export {FormValidator};