import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { ADMIN_EVENT_ROUTER, ADMIN_ROUTER } from "../../utils/consts";
import { observer } from "mobx-react-lite";
import "./AdminHeader.css";
import { Context } from "../..";

export const AdminHeader: FC = observer(() => {
  const { user } = useContext(Context);
  return (
    <header className="headeradmin shadow">
      <nav className="headeradmin-navigation">
        <Link
          className="headeradmin-navigation__logo"
          to={
            user.isAuth
              ? "../../" + ADMIN_EVENT_ROUTER
              : "../../" + ADMIN_ROUTER
          }
        >
          <img
            src="/img/adminlogo.png"
            alt="Админ панель"
            width="180"
            height="25"
          />
        </Link>
        {user.isAuth && (
          <div className="row">
            <label className="headeradmin-navigation__item bcursor">
              {user.user?.login}
            </label>
            <div
              className="headeradmin-navigation__item"
              onClick={() => {
                user.setIsAuth(false);
                user.setUser(null);
                localStorage.setItem("token", "");
              }}
            >
              <img
                className="headeradmin_img"
                src="/img/logout.png"
                alt="logout"
              />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
});
