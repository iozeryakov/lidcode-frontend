import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../..";
import { Panel } from "../../../components/Panel/Panel";
import { useInput } from "../../../hooks/useInput";
import { createOrganizer } from "../../../http/organizerAPI";

import { AdminLayout } from "../../../layouts/AdminLayout/AdminLayout";
import { ADMIN_ORGANIZER_ROUTER } from "../../../utils/consts";
import "../Admin.css";
export const AdminOrganizerNew: FC = () => {
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
  const [image, setImage] = useState<string | File>("");
  const [imageIsDirty, setImageIsDirty] = useState(false);
  const setFile = (e: FileList | null) => {
    if (
      e &&
      e[0] &&
      ["jpg", "jpeg", "png"].filter((i) => i === e[0].name.split(".")[1])
        .length > 0
    ) {
      setImage(e[0]);
    } else {
      modal.setIsVisible(true, "Файл не верный", true);
      setImage("");
    }
  };
  const addOrganizer = () => {
    name.onBlur();
    link.onBlur();
    setImageIsDirty(true);
    if (name.inputValid && link.inputValid && image) {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("image", image);
      formData.append("link", link.value);
      createOrganizer(formData)
        .then(() => {
          modal.setIsVisible(true, "Успешно добавлено", false);
          navigate("../" + ADMIN_ORGANIZER_ROUTER);
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
      <h1 className="adminmain-title">Добавить организатора</h1>
      <div className="adminmain-content shadow">
        <Panel
          add={addOrganizer}
          isAdd={true}
          path={ADMIN_ORGANIZER_ROUTER}
          error={false}
        />
        <form className="admincontent_wrapper">
          <div className="reg_admin__item">
            <div className="column">
              <label className="label mar">Название :</label>
              <label className="label mar">Изображение :</label>
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
                onBlur={() => name.onBlur()}
                onChange={(e) => name.onChange(e)}
                placeholder="Не заполнено*"
              />
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                className={imageIsDirty && !image ? "mar borderRed" : "mar"}
                onBlur={() => setImageIsDirty(true)}
                onChange={(e) => {
                  setFile(e.target.files);
                }}
              />
              <input
                className={
                  link.isDirty && !link.inputValid
                    ? "admininput_text mar borderRed"
                    : "admininput_text mar"
                }
                type="text"
                value={link.value}
                onBlur={() => link.onBlur()}
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
