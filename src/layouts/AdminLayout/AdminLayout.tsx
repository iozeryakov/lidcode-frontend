import { FC, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
import { AdminHeader } from "../../components/AdminHeader/AdminHeader";
import {
  ADMIN_EVENT_ROUTER,
  ADMIN_MATERIAL_ROUTER,
  ADMIN_ORGANIZER_ROUTER,
  ADMIN_PARTICIPANT_ROUTER,
  ADMIN_SPONSOR_ROUTER,
  ADMIN_TEAM_ROUTER,
} from "../../utils/consts";
import "./AdminLayout.css";
import { Loading } from "../../components/Loading/Loading";
import { ModalInfo } from "../../components/ModalInfo/ModalInfo";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { ILayout } from "../../types/ILayout";

/**
 * Макет для главной страницы
 */
export const AdminLayout: FC<ILayout> = observer(
  ({ loading, children }: ILayout) => {
    const { pathname } = useLocation();
    const { modal, user } = useContext(Context);
    return (
      <>
        <AdminHeader />
        <main className={user.isAuth ? "admin-main" : "admin-main center"}>
          {modal.isVisible && <ModalInfo />}
          {loading && <Loading />}
          {user.isAuth && (
            <nav className="sidebar shadow">
              <ul className="sidebar_ul">
                <li
                  className={
                    pathname.includes("event")
                      ? "sidebar_item active"
                      : "sidebar_item"
                  }
                >
                  <Link className="link" to={"../../" + ADMIN_EVENT_ROUTER}>
                    <label className="sidebar_item__a">
                      <img
                        className="sidebar_img"
                        src="/img/event.png"
                        alt="Соревнования"
                        width="30"
                        height="30"
                      />
                      Соревнования
                    </label>
                  </Link>
                </li>
                <li
                  className={
                    pathname.includes("material")
                      ? "sidebar_item active"
                      : "sidebar_item"
                  }
                >
                  <Link className="link" to={"../../" + ADMIN_MATERIAL_ROUTER}>
                    <label className="sidebar_item__a">
                      <img
                        className="sidebar_img"
                        src="/img/mater.png"
                        alt="Материалы"
                        width="30"
                        height="30"
                      />
                      Материалы
                    </label>
                  </Link>
                </li>
                <li
                  className={
                    pathname.includes("team")
                      ? "sidebar_item active"
                      : "sidebar_item"
                  }
                >
                  <Link className="link" to={"../../" + ADMIN_TEAM_ROUTER}>
                    <label className="sidebar_item__a">
                      <img
                        className="sidebar_img"
                        src="/img/teams.png"
                        alt="Команды"
                        width="30"
                        height="30"
                      />
                      Команды
                    </label>
                  </Link>
                </li>
                <li
                  className={
                    pathname.includes("participant")
                      ? "sidebar_item active"
                      : "sidebar_item"
                  }
                >
                  <Link
                    className="link"
                    to={"../../" + ADMIN_PARTICIPANT_ROUTER}
                  >
                    <label className="sidebar_item__a">
                      <img
                        className="sidebar_img"
                        src="/img/part.png"
                        alt="Участники"
                        width="30"
                        height="30"
                      />
                      Участники
                    </label>
                  </Link>
                </li>
                <li
                  className={
                    pathname.includes("organizer")
                      ? "sidebar_item active"
                      : "sidebar_item"
                  }
                >
                  <Link className="link" to={"../../" + ADMIN_ORGANIZER_ROUTER}>
                    <label className="sidebar_item__a">
                      <img
                        className="sidebar_img"
                        src="/img/organiz.png"
                        alt="Организаторы"
                        width="30"
                        height="30"
                      />
                      Организаторы
                    </label>
                  </Link>
                </li>

                <li
                  className={
                    pathname.includes("sponsor")
                      ? "sidebar_item active"
                      : "sidebar_item"
                  }
                >
                  <Link className="link" to={"../../" + ADMIN_SPONSOR_ROUTER}>
                    <label className="sidebar_item__a">
                      <img
                        className="sidebar_img"
                        src="/img/sponsor.png"
                        alt="Спонсоры"
                        width="30"
                        height="30"
                      />
                      Спонсоры
                    </label>
                  </Link>
                </li>
              </ul>
            </nav>
          )}
          <div
            className={
              user.isAuth
                ? "adminmain-wrapper"
                : "adminmain-wrapper wrapper-center"
            }
          >
            {children}
          </div>
        </main>
        <Footer />
      </>
    );
  }
);
