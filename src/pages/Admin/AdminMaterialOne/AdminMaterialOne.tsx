import { FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../..";
import { Panel } from "../../../components/Panel/Panel";
import { useInput } from "../../../hooks/useInput";
import { getMaterial, updateMaterial } from "../../../http/materialAPI";
import { AdminLayout } from "../../../layouts/AdminLayout/AdminLayout";
import { ADMIN_MATERIAL_ROUTER } from "../../../utils/consts";
import "../Admin.css";

export const AdminMaterialOne: FC = () => {
  const { modal, user } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
  const getData = async () => {
    if (id) {
      await getMaterial(id)
        .then((e) => {
          name.onBlur();
          link.onBlur();
          name.setValue(e.name);
          link.setValue(e.link);
        })
        .catch((e) => {
          if (e.response.data.message === "Не авторизован") {
            modal.setIsVisible(true, "Ошибка, авторизуйтесь", true);
            user.setIsAuth(false);
            user.setUser(null);
          } else {
            modal.setIsVisible(true, "Ошибка", true);
            setError(true);
          }
        });
    }
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  const addMaterial = () => {
    if (name.inputValid && link.inputValid) {
      setLoading(true);
      updateMaterial({ id: id, name: name.value, link: link.value })
        .then(() => {
          modal.setIsVisible(true, "Успешно сохранено", false);
          navigate("../" + ADMIN_MATERIAL_ROUTER);
        })
        .catch((e) => {
          if (e.response.data.message === "Не авторизован") {
            modal.setIsVisible(true, "Ошибка сохранения, авторизуйтесь", true);
            user.setIsAuth(false);
            user.setUser(null);
          } else {
            modal.setIsVisible(true, "Ошибка сохранения", true);
            setLoading(false);
          }
        });
    } else {
      modal.setIsVisible(true, "Не все поля заполнены верно", true);
    }
  };
  return (
    <AdminLayout loading={loading}>
      <h1 className="adminmain-title">Материал {name.value}</h1>
      <div className="adminmain-content shadow">
        <Panel
          add={addMaterial}
          isAdd={false}
          path={ADMIN_MATERIAL_ROUTER}
          error={error}
        />
        {!error && (
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
                  onChange={(e) => link.onChange(e)}
                  placeholder="Не заполнено*"
                />
              </div>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
};
