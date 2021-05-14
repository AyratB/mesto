import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{

    static popupWithFormConfig = {
        formClassSelector: ".form",
        formInputClassSelector: ".form__input",
    }

    constructor({ popupSelector, submitFormCb }){
        super(popupSelector);
        this._submitFormCb = submitFormCb;        
        this._form = this._popup.querySelector(PopupWithForm.popupWithFormConfig.formClassSelector);

    }

    _getInputValues(){
        
        const inputs = this._form.querySelectorAll(PopupWithForm.popupWithFormConfig.formInputClassSelector);
        
        this.name = inputs[0].value;
        this.description = inputs[1].value;
    }

    setEventListeners = () => {

        super.setEventListeners();      

        this._form.addEventListener("submit", (e) => {

            this._submitFormCb(e, this.name, this.description);
        });
    }

    close(){
      this._form.reset();
      super.close();
    }
}