import { FC } from "react";
import { Link } from "react-router-dom";
import { ADMIN_ROUTER, MAIN_ROUTER } from "../../utils/consts";
import "./Header.css";

export const Header: FC = () => {
  return (
    <header className="header">
      <nav className="header-navigation">
        <Link className="header-navigation__logo" to={MAIN_ROUTER}>
          <img src="/img/logo.png" alt="Соревнования" width="200" height="30" />
        </Link>
        <Link className="header-navigation__item" to={"../" + ADMIN_ROUTER}>
          Для администраторов
        </Link>
      </nav>
    </header>
  );
};
