import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  static popupWithImageConfig = {
    figureImageClassSelector: ".figure__image",
    figureCaptionClassSelector: ".figure__caption",
  };

  constructor(popupSelector) {
    super(popupSelector);

    this._figureImage = this._popup.querySelector(
      PopupWithImage.popupWithImageConfig.figureImageClassSelector
    );
    this._figureCaption = this._popup.querySelector(
      PopupWithImage.popupWithImageConfig.figureCaptionClassSelector
    );
  }

  open(name, link) {
    this._figureImage.src = link;
    this._figureImage.alt = name;

    this._figureCaption.textContent = name;

    super.open();
  }
}
