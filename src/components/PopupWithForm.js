import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  static popupWithFormConfig = {
    formClassSelector: ".form",
    formInputClassSelector: ".form__input",
  };

  constructor({ popupSelector, submitFormCb }) {
    super(popupSelector);
    this._submitFormCb = submitFormCb;
    this.form = this._popup.querySelector(
      PopupWithForm.popupWithFormConfig.formClassSelector
    );
  }

  _getInputValues() {
    const inputs = this.form.querySelectorAll(
      PopupWithForm.popupWithFormConfig.formInputClassSelector
    );

    this.name = inputs[0].value;
    this.description = inputs[1].value;
  }

  setEventListeners() {
    super.setEventListeners();

    this.form.addEventListener("submit", (e) => {
      this._getInputValues();
      this._submitFormCb(e, this.name, this.description);
    });
  }

  close() {
    this.form.reset();
    super.close();
  }
}
