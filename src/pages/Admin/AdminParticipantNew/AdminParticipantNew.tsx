import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../..";
import { Panel } from "../../../components/Panel/Panel";
import { useInput } from "../../../hooks/useInput";
import { createParticipant } from "../../../http/participantAPI";

import { AdminLayout } from "../../../layouts/AdminLayout/AdminLayout";
import { ADMIN_PARTICIPANT_ROUTER } from "../../../utils/consts";
import "../Admin.css";

export const AdminParticipantNew: FC = () => {
  const { modal, user } = useContext(Context);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const name = useInput("", {
    minLength: 3,
    maxLength: 50,
    isEmpty: true,
  });
  const emailAdress = useInput("", {
    minLength: 3,
    maxLength: 50,
    isEmpty: true,
    email: true,
  });
  const phoneNumbers = useInput("", {
    minLength: 3,
    maxLength: 50,
    isEmpty: true,
    phoneNumbers: true,
  });
  const organization = useInput("", {
    minLength: 3,
    maxLength: 50,
    isEmpty: true,
  });
  const universityFaculty = useInput("", {
    minLength: 3,
    maxLength: 50,
    isEmpty: true,
  });
  const universityCourse = useInput("", {
    minLength: 1,
    maxLength: 50,
    isEmpty: true,
  });

  const addParticipant = () => {
    name.onBlur();
    emailAdress.onBlur();
    phoneNumbers.onBlur();
    organization.onBlur();
    universityFaculty.onBlur();
    universityCourse.onBlur();
    if (
      name.inputValid &&
      emailAdress.inputValid &&
      phoneNumbers.inputValid &&
      organization.inputValid &&
      universityFaculty.inputValid &&
      universityCourse.inputValid
    ) {
      setLoading(true);
      createParticipant({
        name: name.value,
        emailAdress: emailAdress.value,
        phoneNumbers: phoneNumbers.value,
        organization: organization.value,
        universityFaculty: universityFaculty.value,
        universityCourse: universityCourse.value,
      })
        .then(() => {
          modal.setIsVisible(true, "Успешно добавлено", false);
          navigate("../" + ADMIN_PARTICIPANT_ROUTER);
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
      <h1 className="adminmain-title">Добавить участника</h1>
      <div className="adminmain-content shadow">
        <Panel
          add={addParticipant}
          isAdd={true}
          path={ADMIN_PARTICIPANT_ROUTER}
          error={false}
        />
        <form className="admincontent_wrapper">
          <div className="reg_admin__item">
            <div className="column">
              <label className="label mar">ФИО :</label>
              <label className="label mar">Email :</label>
              <label className="label mar">Телефон :</label>
              <label className="label mar">Организация :</label>
              <label className="label mar">Факультет :</label>
              <label className="label mar">Курс :</label>
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
                className={
                  emailAdress.isDirty && !emailAdress.inputValid
                    ? "admininput_text mar borderRed"
                    : "admininput_text mar"
                }
                type="text"
                value={emailAdress.value}
                onBlur={() => emailAdress.onBlur()}
                onChange={(e) => emailAdress.onChange(e)}
                placeholder="Не заполнено*"
              />
              <input
                className={
                  phoneNumbers.isDirty && !phoneNumbers.inputValid
                    ? "admininput_text mar borderRed"
                    : "admininput_text mar"
                }
                type="text"
                value={phoneNumbers.value}
                onBlur={() => phoneNumbers.onBlur()}
                onChange={(e) => phoneNumbers.onChange(e)}
                placeholder="Не заполнено*"
              />
              <input
                className={
                  organization.isDirty && !organization.inputValid
                    ? "admininput_text mar borderRed"
                    : "admininput_text mar"
                }
                type="text"
                value={organization.value}
                onBlur={() => organization.onBlur()}
                onChange={(e) => organization.onChange(e)}
                placeholder="Не заполнено*"
              />
              <input
                className={
                  universityFaculty.isDirty && !universityFaculty.inputValid
                    ? "admininput_text mar borderRed"
                    : "admininput_text mar"
                }
                type="text"
                value={universityFaculty.value}
                onBlur={() => universityFaculty.onBlur()}
                onChange={(e) => universityFaculty.onChange(e)}
                placeholder="Не заполнено*"
              />
              <input
                className={
                  universityCourse.isDirty && !universityCourse.inputValid
                    ? "admininput_text mar borderRed"
                    : "admininput_text mar"
                }
                type="text"
                value={universityCourse.value}
                onBlur={() => universityCourse.onBlur()}
                onChange={(e) => universityCourse.onChange(e)}
                placeholder="Не заполнено*"
              />
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};
