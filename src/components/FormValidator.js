export class FormValidator {
  constructor(validationConfig, form) {
    this._validationConfig = validationConfig;
    this._form = form;
    this._buttonSubmit = this._form.querySelector(
      this._validationConfig.submitButtonSelector
    );
    this._inputs = Array.from(
      this._form.querySelectorAll(this._validationConfig.inputSelector)
    );
  }

  enableValidation() {
    this._setFormsEventListeners();
  }

  _setFormsEventListeners = () => {
    this._form.addEventListener("submit", this._submitFormHandler);
    this._form.addEventListener("input", this._inputFormHandler);
  };

  _submitFormHandler = (e) => e.preventDefault();

  _checkInputValidity = (input) => {
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input);
    }
  };

  _hideInputError = (input) => {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    errorElement.textContent = "";
    errorElement.classList.remove(this._validationConfig.errorClass);

    input.classList.remove(this._validationConfig.inputErrorClass);
  };

  _showInputError = (input) => {
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._validationConfig.errorClass);

    input.classList.add(this._validationConfig.inputErrorClass);
  };

  _inputFormHandler = (e) => {
    const input = e.target;

    this._checkInputValidity(input);
    this._toggleSaveButton(this._buttonSubmit);
  };

  _toggleSaveButton = () => {
    if (this._inputs.some((input) => !input.validity.valid)) {
      this.makeButtonDisable();
    } else {
      this._makeButtonNotDisable();
    }
  };

  _makeButtonNotDisable = () => {
    this._buttonSubmit.disabled = false;
    this._buttonSubmit.classList.remove(this._validationConfig.inactiveButtonClass);
  };

  makeButtonDisable = () => {
    this._buttonSubmit.disabled = true;
    this._buttonSubmit.classList.add(this._validationConfig.inactiveButtonClass);
  };

  clearAllFormErrors = () =>
    this._inputs.forEach((input) => this._hideInputError(input));
}
