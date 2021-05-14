export class Popup {
  static popupConfig = {
    KEY_TO_CLOSE: "Escape",
    openedClass: "popup_opened",
    popupOverlayClassSelector: ".popup__overlay",
    buttonClosePopupClassSelector: ".button_type_close-popup",
  };

  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add(Popup.popupConfig.openedClass);

    this._popupOverlay = this._popup.querySelector(
      Popup.popupConfig.popupOverlayClassSelector
    );
    this._popupOverlay.addEventListener("click", this._handlePopupOverlayClick);

    window.addEventListener("keyup", this._handleEscClose);

    this.setEventListeners();
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
    if (e.key === Popup.popupConfig.KEY_TO_CLOSE) {
      this.close();
    }
  };

  setEventListeners() {
    const buttonClose = this._popup.querySelector(
      Popup.popupConfig.buttonClosePopupClassSelector
    );
    buttonClose.addEventListener("click", this._handleCloseButtonClick);
  }

  _handleCloseButtonClick = () => this.close();
}
