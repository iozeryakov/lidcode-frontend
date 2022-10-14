import React, { createContext } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import ModalStore from "./store/ModalStore";
import UserStore from "./store/UserStore";
export const Context = createContext({
  modal: new ModalStore(),
  user: new UserStore(),
});
ReactDOM.render(
  <React.StrictMode>
    <Context.Provider
      value={{ modal: new ModalStore(), user: new UserStore() }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
