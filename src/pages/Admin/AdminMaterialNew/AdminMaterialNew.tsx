import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../..";
import { Panel } from "../../../components/Panel/Panel";
import { useInput } from "../../../hooks/useInput";
import { createMaterial } from "../../../http/materialAPI";

import { AdminLayout } from "../../../layouts/AdminLayout/AdminLayout";
import { ADMIN_MATERIAL_ROUTER } from "../../../utils/consts";
import "../Admin.css";

export const AdminMaterialNew: FC = () => {
  const { modal, user } = useContext(Context);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const name = useInput("", {
    minLength: 3,
    maxLength: 50,
    isEmpty: true,
  });
  const link = useInput("", {
    minLength: 3,
    maxLength: 100,
    isEmpty: true,
    link: true,
  });
  const addMaterial = () => {
    name.onBlur();
    link.onBlur();
    if (name.inputValid && link.inputValid) {
      setLoading(true);
      createMaterial({ name: name.value, link: link.value })
        .then(() => {
          modal.setIsVisible(true, "Успешно добавлено", false);
          navigate("../" + ADMIN_MATERIAL_ROUTER);
        })
        .catch((e) => {
          if (e.response.data.message === "Не авторизован") {
            modal.setIsVisible(true, "Ошибка добавления, авторизуйтесь", true);
            user.setIsAuth(false);
            user.setUser(null);
          } else {
            modal.setIsVisible(true, "Ошибка добавления", true);
            setLoading(false);
          }
        });
    } else {
      modal.setIsVisible(true, "Не все поля заполнены верно", true);
    }
  };
  return (
    <AdminLayout loading={loading}>
      <h1 className="adminmain-title">Добавить материал</h1>
      <div className="adminmain-content shadow">
        <Panel
          add={addMaterial}
          isAdd={true}
          path={ADMIN_MATERIAL_ROUTER}
          error={false}
        />
        <form className="admincontent_wrapper">
          <div className="reg_admin__item">
            <div className="column">
              <label className="label mar">Название :</label>
              <label className="label mar">Ссылка :</label>
            </div>
            <div className="column">
              <input
                className={
                  name.isDirty && !name.inputValid
                    ? "admininput_text mar borderRed"
                    : "admininput_text mar"
                }
                type="text"
                value={name.value}
                onBlur={(e) => name.onBlur()}
                onChange={(e) => name.onChange(e)}
                placeholder="Не заполнено*"
              />
              <input
                className={
                  link.isDirty && !link.inputValid
                    ? "admininput_text mar borderRed"
                    : "admininput_text mar"
                }
                type="text"
                value={link.value}
                onBlur={(e) => link.onBlur()}
                onChange={(e) => link.onChange(e)}
                placeholder="Не заполнено*"
              />
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};
