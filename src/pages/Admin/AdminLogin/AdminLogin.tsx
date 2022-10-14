import { FC, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../..";
import { useInput } from "../../../hooks/useInput";
import { login } from "../../../http/userAPI";
import { AdminLayout } from "../../../layouts/AdminLayout/AdminLayout";
import { ADMIN_EVENT_ROUTER } from "../../../utils/consts";
import "../Admin.css";

export const AdminLogin: FC = () => {
  const { modal, user } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const name = useInput("", {
    minLength: 3,
    maxLength: 50,
    isEmpty: true,
  });
  const password = useInput("", {
    minLength: 4,
    maxLength: 50,
    isEmpty: true,
  });
  const authorization = async () => {
    name.onBlur();
    password.onBlur();
    if (name.inputValid && password.inputValid) {
      setLoading(true);
      login(name.value, password.value)
        .then((e) => {
          user.setIsAuth(true);
          user.setUser(e);
          modal.setIsVisible(true, "Добро пожаловать", false);
          if (pathname === "/admin") navigate("../" + ADMIN_EVENT_ROUTER);
        })
        .catch((e) => {
          modal.setIsVisible(true, e.response.data.message, true);
          setLoading(false);
        });
    } else {
      modal.setIsVisible(true, "Не все поля заполнены верно", true);
    }
  };
  return (
    <AdminLayout loading={loading}>
      {user.isAuth ? (
        <h1 className="adminmain-title">
          {"Привет " + user.user?.login + ", выбери нужный раздел!"}
        </h1>
      ) : (
        <div className="main-wrapper registr">
          <h1 className="main-title">Аунтификация</h1>
          <div className="main-content">
            <form className="reg_form">
              <div className="reg_form__item">
                <img className="img_input" src="/img/name.png" alt="Логин" />
                <input
                  className="input_text "
                  type="text"
                  placeholder="Логин*"
                  value={name.value}
                  onBlur={(e) => name.onBlur()}
                  onChange={(e) => name.onChange(e)}
                />
                {name.isDirty && !name.inputValid && (
                  <div className="red">*</div>
                )}
              </div>

              <div className="reg_form__item">
                <img
                  className="img_input"
                  src="/img/padlock.png"
                  alt="Пароль"
                />
                <input
                  className="input_text "
                  type="password"
                  placeholder="Пароль*"
                  value={password.value}
                  onBlur={(e) => password.onBlur()}
                  onChange={(e) => password.onChange(e)}
                />
                {password.isDirty && !password.inputValid && (
                  <div className="red">*</div>
                )}
              </div>
              <input
                type="button"
                value="Войти"
                className="button"
                onClick={() => {
                  authorization();
                }}
              />
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
