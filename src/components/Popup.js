const KEY_TO_CLOSE = "Escape";

export class Popup {
  static popupConfig = {
    openedClass: "popup_opened",
    popupOverlayClassSelector: ".popup__overlay",
    buttonClosePopupClassSelector: ".button_type_close-popup",
  };

  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupOverlay = this._popup.querySelector(
      Popup.popupConfig.popupOverlayClassSelector
    );

    this._buttonClose = this._popup.querySelector(
      Popup.popupConfig.buttonClosePopupClassSelector
    );
  }

  open() {
    this._popup.classList.add(Popup.popupConfig.openedClass);

    this._popupOverlay.addEventListener("click", this._handlePopupOverlayClick);

    window.addEventListener("keyup", this._handleEscClose);
  }

  _handlePopupOverlayClick = () => this.close();

  close() {
    this._popup.classList.remove(Popup.popupConfig.openedClass);
    this._popupOverlay.removeEventListener(
      "click",
      this._handlePopupOverlayClick
    );

    window.removeEventListener("keyup", this._handleEscClose);
  }

  _handleEscClose = (e) => {
    if (e.key === KEY_TO_CLOSE) {
      this.close();
    }
  };

  setEventListeners() {
    this._buttonClose.addEventListener("click", this._handleCloseButtonClick);
  }

  _handleCloseButtonClick = () => this.close();
}
