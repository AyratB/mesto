export class UserInfo {
  constructor({ profileNameSelector, profileDescriptionSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileDescription = document.querySelector(
      profileDescriptionSelector
    );
  }

  getUserInfo() {
    return {
      profileName: this._profileName.textContent,
      profileDescription: this._profileDescription.textContent,
    };
  }

  setUserInfo(name, description) {
    this._profileName.textContent = name;
    this._profileDescription.textContent = description;
  }
}
