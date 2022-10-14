import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../..";
import { Panel } from "../../../components/Panel/Panel";
import { useInput } from "../../../hooks/useInput";
import { createEvent } from "../../../http/eventAPI";

import { AdminLayout } from "../../../layouts/AdminLayout/AdminLayout";
import { ADMIN_EVENT_ROUTER } from "../../../utils/consts";
import "../Admin.css";

export const AdminEventNew: FC = () => {
  const { modal, user } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    isHidden: "true",
  });
  const dateStart = useInput("", {
    minLength: 16,
    maxLength: 50,
    isEmpty: true,
  });
  const timePublicationAdditionalMaterial = useInput("", {
    minLength: 16,
    maxLength: 50,
    isEmpty: true,
  });
  const name = useInput("", {
    minLength: 3,
    maxLength: 50,
    isEmpty: true,
  });
  const description = useInput("", {
    minLength: 10,
    maxLength: 5000,
    isEmpty: true,
  });
  const numberOfParticipants = useInput("1", {
    minLength: 1,
    maxLength: 50,
    isEmpty: true,
  });
  const numberComands = useInput("1", {
    minLength: 1,
    maxLength: 50,
    isEmpty: true,
  });
  const regulations = useInput("", {
    minLength: 10,
    maxLength: 5000,
    isEmpty: true,
  });
  const results = useInput("", {
    minLength: 10,
    maxLength: 5000,
    isEmpty: true,
  });
  const dateRegister = useInput("", {
    minLength: 16,
    maxLength: 50,
    isEmpty: true,
  });
  const dateCloseRegister = useInput("", {
    minLength: 16,
    maxLength: 50,
    isEmpty: true,
  });
  const datEnd = useInput("", {
    minLength: 16,
    maxLength: 50,
    isEmpty: true,
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
  const addEvent = () => {
    name.onBlur();
    description.onBlur();
    numberComands.onBlur();
    setImageIsDirty(true);
    numberOfParticipants.onBlur();
    regulations.onBlur();
    datEnd.onBlur();
    dateCloseRegister.onBlur();
    dateRegister.onBlur();
    dateStart.onBlur();
    results.onBlur();
    timePublicationAdditionalMaterial.onBlur();
    if (
      dateRegister.value <= dateCloseRegister.value &&
      dateCloseRegister.value <= dateStart.value &&
      dateStart.value <= datEnd.value &&
      name.inputValid &&
      description.inputValid &&
      numberComands.inputValid &&
      image &&
      numberOfParticipants.inputValid &&
      regulations.inputValid &&
      datEnd.inputValid &&
      dateCloseRegister.inputValid &&
      dateRegister.inputValid &&
      dateStart.inputValid &&
      results.inputValid &&
      timePublicationAdditionalMaterial.inputValid
    ) {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("image", image);
      formData.append("isHidden", data.isHidden);
      formData.append("datEnd", datEnd.value);
      formData.append("dateCloseRegister", dateCloseRegister.value);
      formData.append("dateRegister", dateRegister.value);
      formData.append("dateStart", dateStart.value);
      formData.append("description", description.value);
      formData.append("numberComands", numberComands.value);
      formData.append("numberOfParticipants", numberOfParticipants.value);
      formData.append("results", results.value);
      formData.append("regulations", regulations.value);
      formData.append(
        "timePublicationAdditionalMaterial",
        timePublicationAdditionalMaterial.value
      );

      createEvent(formData)
        .then(() => {
          modal.setIsVisible(true, "Успешно добавлено", false);
          navigate("../" + ADMIN_EVENT_ROUTER);
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
      <h1 className="adminmain-title">Добавить соревнование</h1>
      <div className="adminmain-content shadow">
        <Panel
          add={addEvent}
          isAdd={true}
          path={ADMIN_EVENT_ROUTER}
          error={false}
        />
        <form className="admincontent_wrapper">
          <div className="reg_admin__item">
            <div className="column">
              <label className="label mar">Назавние соревнования :</label>
              <label className="label mar">Статус :</label>
              <label className="label  marg200">Описание :</label>
              <label className="label mar ">Количество команд :</label>
              <label className="label mar">
                Количество участиков в команде :
              </label>
              <label className="label  marg200">Правила :</label>
              <label className="label marg200">Результаты :</label>
              <label className="label mar">Изображение :</label>
              <label className="label mar">Дата открытия регистрации :</label>
              <label className="label mar">Дата закрытия регистрации :</label>
              <label className="label mar">Дата начала соревнования :</label>
              <label className="label mar">Дата закрытия соревнования :</label>
              <label className="label mar">Дата публикации материалов :</label>
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
              <select
                className="select mar"
                value={data.isHidden}
                onChange={(e) =>
                  setData((prev) => ({ isHidden: e.target.value }))
                }
              >
                <option value="true">Скрытое</option>
                <option value="false">Открытое</option>
              </select>
              <textarea
                className={
                  description.isDirty && !description.inputValid
                    ? "textarea mar borderRed"
                    : "textarea mar"
                }
                value={description.value}
                onBlur={() => description.onBlur()}
                onChange={(e) => description.onChange(e)}
              />
              <input
                type="number"
                className={
                  numberComands.isDirty && !numberComands.inputValid
                    ? "mar borderRed maxWidth"
                    : "mar maxWidth"
                }
                value={numberComands.value}
                onBlur={() => numberComands.onBlur()}
                onChange={(e) =>
                  numberComands.setValue(
                    e.target.value.length !== 0 && Number(e.target.value) < 1
                      ? "1"
                      : e.target.value
                  )
                }
                min={1}
              />
              <input
                type="number"
                className={
                  numberOfParticipants.isDirty &&
                  !numberOfParticipants.inputValid
                    ? "mar borderRed maxWidth"
                    : "mar maxWidth"
                }
                value={numberOfParticipants.value}
                onBlur={() => numberOfParticipants.onBlur()}
                onChange={(e) =>
                  numberOfParticipants.setValue(
                    e.target.value.length !== 0 && Number(e.target.value) < 1
                      ? "1"
                      : e.target.value
                  )
                }
                min={1}
              />
              <textarea
                className={
                  regulations.isDirty && !regulations.inputValid
                    ? " textarea mar borderRed"
                    : " textarea mar"
                }
                value={regulations.value}
                onBlur={() => regulations.onBlur()}
                onChange={(e) => regulations.onChange(e)}
              />
              <textarea
                className={
                  results.isDirty && !results.inputValid
                    ? " textarea mar borderRed"
                    : " textarea mar"
                }
                value={results.value}
                onBlur={() => results.onBlur()}
                onChange={(e) => results.onChange(e)}
              />
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                className={imageIsDirty && !image ? "mar borderRed" : "mar "}
                onChange={(e) => {
                  setFile(e.target.files);
                }}
              />
              <input
                type="datetime-local"
                className={
                  dateRegister.isDirty && !dateRegister.inputValid
                    ? "mar borderRed"
                    : "mar"
                }
                value={dateRegister.value}
                onBlur={() => dateRegister.onBlur()}
                onChange={(e) => dateRegister.onChange(e)}
              />
              <input
                type="datetime-local"
                className={
                  (dateCloseRegister.isDirty &&
                    !dateCloseRegister.inputValid) ||
                  dateCloseRegister.value < dateRegister.value
                    ? "mar borderRed"
                    : "mar"
                }
                value={dateCloseRegister.value}
                onBlur={() => dateCloseRegister.onBlur()}
                onChange={(e) => {
                  dateCloseRegister.onChange(e);
                }}
              />
              <input
                type="datetime-local"
                className={
                  (dateStart.isDirty && !dateStart.inputValid) ||
                  dateStart.value < dateCloseRegister.value
                    ? "mar borderRed"
                    : "mar"
                }
                value={dateStart.value}
                onBlur={() => dateStart.onBlur()}
                onChange={(e) => dateStart.onChange(e)}
              />
              <input
                type="datetime-local"
                className={
                  (datEnd.isDirty && !datEnd.inputValid) ||
                  datEnd.value < dateStart.value
                    ? "mar borderRed"
                    : "mar"
                }
                value={datEnd.value}
                onBlur={() => datEnd.onBlur()}
                onChange={(e) => datEnd.onChange(e)}
              />
              <input
                type="datetime-local"
                className={
                  timePublicationAdditionalMaterial.isDirty &&
                  !timePublicationAdditionalMaterial.inputValid
                    ? "mar borderRed"
                    : "mar"
                }
                value={timePublicationAdditionalMaterial.value}
                onBlur={() => timePublicationAdditionalMaterial.onBlur()}
                onChange={(e) => timePublicationAdditionalMaterial.onChange(e)}
              />
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};
