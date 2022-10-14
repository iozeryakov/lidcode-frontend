import { makeAutoObservable } from "mobx";
export default class ModalStore {
  _isVisible: boolean;
  _info: string;
  _isRed: boolean;
  constructor() {
    this._isVisible = false;
    this._info = "";
    this._isRed = false;
    makeAutoObservable(this);
  }
  setIsVisible(isVisible: boolean, info: string, isRed: boolean) {
    this._info = info;
    this._isRed = isRed;
    if (isVisible) {
      this._isVisible = isVisible;
      setTimeout(() => this.setIsVisible(false, "", false), 3000);
    } else {
      this._isVisible = isVisible;
    }
  }

  get isVisible() {
    return this._isVisible;
  }
  get info() {
    return this._info;
  }
  get isRed() {
    return this._isRed;
  }
}
