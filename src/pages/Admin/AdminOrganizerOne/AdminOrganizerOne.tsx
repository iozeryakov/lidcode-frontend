import { FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../..";
import { Panel } from "../../../components/Panel/Panel";
import { useInput } from "../../../hooks/useInput";
import { getOrganizer, updateOrganizer } from "../../../http/organizerAPI";

import { AdminLayout } from "../../../layouts/AdminLayout/AdminLayout";
import { ADMIN_ORGANIZER_ROUTER } from "../../../utils/consts";
import "../Admin.css";

export const AdminOrganizerOne: FC = () => {
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
  const [image, setImage] = useState<string | File>("");
  const [imageO, setImageO] = useState("");

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
      setImage(imageO);
    }
  };
  const getData = async () => {
    if (id) {
      await getOrganizer(id)
        .then((e) => {
          name.setValue(e.name);
          link.setValue(e.link);
          setImage(e.image);
          setImageO(e.image);
          name.onBlur();
          link.onBlur();
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

  const addOrganizer = () => {
    if (name.inputValid && link.inputValid && image) {
      setLoading(true);
      const formData = new FormData();
      if (id) formData.append("id", id);
      formData.append("name", name.value);
      formData.append("image", image);
      formData.append("link", link.value);

      updateOrganizer(formData)
        .then(() => {
          modal.setIsVisible(true, "Успешно сохранено", false);
          navigate("../" + ADMIN_ORGANIZER_ROUTER);
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
      <h1 className="adminmain-title">Организатор {name.value}</h1>
      <div className="adminmain-content shadow">
        <Panel
          add={addOrganizer}
          isAdd={false}
          path={ADMIN_ORGANIZER_ROUTER}
          error={error}
        />
        {!error && (
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
                  onChange={(e) => name.onChange(e)}
                  placeholder="Не заполнено*"
                />
                <input
                  type="file"
                  className="mar"
                  accept=".jpg,.jpeg,.png"
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
