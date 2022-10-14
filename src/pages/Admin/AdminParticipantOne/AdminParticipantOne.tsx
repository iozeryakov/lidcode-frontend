import { FC, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../../..";
import { Panel } from "../../../components/Panel/Panel";
import { useInput } from "../../../hooks/useInput";
import {
  getParticipant,
  updateParticipant,
} from "../../../http/participantAPI";

import { AdminLayout } from "../../../layouts/AdminLayout/AdminLayout";
import {
  ADMIN_PARTICIPANT_ROUTER,
  ADMIN_TEAM_ROUTER,
} from "../../../utils/consts";
import "../Admin.css";

export const AdminParticipantOne: FC = () => {
  const { modal, user } = useContext(Context);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [link, setLink] = useState({
    name: "",
    link: "../" + ADMIN_TEAM_ROUTER,
  });
  const navigate = useNavigate();
  const [error, setError] = useState(false);
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
  const getData = async () => {
    if (id) {
      await getParticipant(id)
        .then((e) => {
          name.setValue(e.name);
          emailAdress.setValue(e.emailAdress);
          phoneNumbers.setValue(e.phoneNumbers);
          organization.setValue(e.organization);
          universityFaculty.setValue(e.universityFaculty);
          universityCourse.setValue(e.universityCourse);
          name.onBlur();
          emailAdress.onBlur();
          phoneNumbers.onBlur();
          organization.onBlur();
          universityFaculty.onBlur();
          universityCourse.onBlur();
          if (e.team_participants[0]) {
            setLink((prev) => ({
              name: e.team_participants[0].team.name,
              link: prev.link + "/" + e.team_participants[0].team.id,
            }));
          }
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
  const addParticipant = () => {
    if (
      name.inputValid &&
      emailAdress.inputValid &&
      phoneNumbers.inputValid &&
      organization.inputValid &&
      universityFaculty.inputValid &&
      universityCourse.inputValid
    ) {
      setLoading(true);
      updateParticipant({
        id: id,
        name: name.value,
        emailAdress: emailAdress.value,
        phoneNumbers: phoneNumbers.value,
        organization: organization.value,
        universityFaculty: universityFaculty.value,
        universityCourse: universityCourse.value,
      })
        .then(() => {
          modal.setIsVisible(true, "Успешно сохранено", false);
          navigate("../" + ADMIN_PARTICIPANT_ROUTER);
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
      <h1 className="adminmain-title">Участник {name.value}</h1>
      <div className="adminmain-content shadow">
        <Panel
          add={addParticipant}
          isAdd={false}
          path={ADMIN_PARTICIPANT_ROUTER}
          error={error}
        />
        {!error && (
          <form className="admincontent_wrapper">
            <div className="reg_admin__item">
              <div className="column">
                <label className="label mar">Ссылка на команду:</label>
                <label className="label mar">ФИО:</label>
                <label className="label mar">Email:</label>
                <label className="label mar">Телефон:</label>
                <label className="label mar">Организация:</label>
                <label className="label mar">Факультет:</label>
                <label className="label mar">Курс:</label>
              </div>
              <div className="column">
                {link.name === "" ? (
                  <label className="label mar">Не состоит в команде</label>
                ) : (
                  <Link className="label mar" to={link.link}>
                    {link.name}
                  </Link>
                )}
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
                    emailAdress.isDirty && !emailAdress.inputValid
                      ? "admininput_text mar borderRed"
                      : "admininput_text mar"
                  }
                  type="text"
                  value={emailAdress.value}
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
                  onChange={(e) => universityCourse.onChange(e)}
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
