import { makeAutoObservable } from "mobx";
interface IUser {
  login: string;
  id: number;
}
export default class UserStore {
  _isAuth: boolean;
  _user: IUser | null;
  constructor() {
    this._isAuth = false;
    this._user = null;
    makeAutoObservable(this);
  }

  setIsAuth(bool: boolean) {
    this._isAuth = bool;
  }
  setUser(user: IUser | null) {
    this._user = user;
  }

  get isAuth() {
    return this._isAuth;
  }
  get user() {
    return this._user;
  }
}
