import { FC, useContext } from "react";
import { Context } from "../..";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Loading } from "../../components/Loading/Loading";
import { ModalInfo } from "../../components/ModalInfo/ModalInfo";
import { observer } from "mobx-react-lite";
import "./MainLayout.css";
import { ILayout } from "../../types/ILayout";

/**
 * Макет для главной страницы
 */
export const MainLayout: FC<ILayout> = observer(
  ({ children, loading }: ILayout) => {
    const { modal } = useContext(Context);

    return (
      <>
        <Header />
        <main className="main">
          {loading && <Loading />}
          {modal.isVisible && <ModalInfo />}
          {children}
        </main>
        <Footer />
      </>
    );
  }
);
