import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup{

    static popupWithImageConfig = {
        figureImageClassSelector: ".figure__image",
        figureCaptionClassSelector: ".figure__caption",
    }

    constructor(popupSelector, name, link){
        super(popupSelector);
        this._name = name;
        this._link = link;
    }

    open(){

        const figureImage = this._popup.querySelector(PopupWithImage.popupWithImageConfig.figureImageClassSelector);
        const figureCaption = this._popup.querySelector(PopupWithImage.popupWithImageConfig.figureCaptionClassSelector);

        figureImage.src = this._link;
        figureImage.alt = this._name;

        figureCaption.textContent = this._name;

        super.open();
    }
}