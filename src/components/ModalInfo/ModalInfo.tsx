import { FC, useContext } from "react";
import { Context } from "../..";
import "./ModalInfo.css";

export const ModalInfo: FC = () => {
  const { modal } = useContext(Context);

  return (
    <div className="modal cursorDefault">
      <div
        className={
          modal.isRed ? "modal-content rcolor" : "modal-content gcolor"
        }
      >
        <div className="modal_body">{modal.info}</div>
      </div>
    </div>
  );
};
