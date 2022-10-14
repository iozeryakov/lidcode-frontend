import { FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../..";
import { Confirmation } from "../../components/Confirmation/Confirmation";
import { useInput } from "../../hooks/useInput";
import { getEventOne } from "../../http/eventAPI";
import { createTeam, getCod } from "../../http/teamAPI";
import { MainLayout } from "../../layouts/MainLayout/MainLayout";
import { compareDate } from "../../utils/compare";
import { EVENT_ROUTER } from "../../utils/consts";
import "./Registration.css";

export const Registration: FC = () => {
  const navigate = useNavigate();
  const { modal } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [mycod, setMycod] = useState("");

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
  const cod = useInput("", {
    minLength: 4,
    maxLength: 4,
    isEmpty: true,
  });
  const [isOpenCod, setIsOpenCod] = useState(false);
  const getData = async () => {
    if (id) {
      await getEventOne(id.toString())
        .then((e) => {
          if (
            compareDate(
              e.dateNow,
              e.dateRegister,
              e.dateCloseRegister,
              e.dateStart,
              e.datEnd
            ) !== "Регистрация открыта" ||
            e.isHidden ||
            e.event_teams.filter((i) => i.team.approvement === "Подтверждена")
              .length >= e.numberComands ||
            e.numberOfParticipants > 1
          )
            setError(true);
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const openCod = () => {
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
      getCod(emailAdress.value)
        .then((e) => {
          setIsOpenCod(true);
          setMycod(e.cod);
          setLoading(false);
          modal.setIsVisible(true, "Код отправлен", false);
        })
        .catch((e) => {
          modal.setIsVisible(true, "Код не отправлен", true);
          setLoading(false);
        });
    } else {
      modal.setIsVisible(true, "Не все поля заполнены верно", true);
    }
  };
  const addTeam = () => {
    cod.onBlur();

    if (cod.inputValid && cod.value === mycod) {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("eventId", id ? id.toString() : "");
      formData.append(
        "participants",
        JSON.stringify([
          {
            name: name.value,
            emailAdress: emailAdress.value,
            phoneNumbers: phoneNumbers.value,
            organization: organization.value,
            universityFaculty: universityFaculty.value,
            universityCourse: universityCourse.value,
            isCoach: true,
            isContactFace: true,
          },
        ])
      );
      createTeam(formData)
        .then(() => {
          modal.setIsVisible(true, "Заявка успешно отправлена", false);
          navigate("../" + EVENT_ROUTER + "/" + id);
        })
        .catch(() => {
          modal.setIsVisible(true, "Ошибка", true);
          setLoading(false);
        });
    } else {
      modal.setIsVisible(true, "Неверный код подтверждения", true);
    }
  };
  return (
    <MainLayout loading={loading}>
      <div className="main-wrapper registr">
        {error ? (
          <h1 className="main-title">Регистрация недоступна</h1>
        ) : (
          <>
            <h1 className="main-title">Регистрация</h1>
            <div className="main-content">
              <form className="reg_form">
                {isOpenCod ? (
                  <Confirmation
                    addTeam={addTeam}
                    setIsOpenCod={setIsOpenCod}
                    cod={cod}
                    email={emailAdress.value}
                  />
                ) : (
                  <>
                    <div className="reg_form__item">
                      <img
                        className="img_input"
                        src="/img/name.png"
                        alt="ФИО"
                      />
                      <input
                        className="input_text"
                        type="text"
                        placeholder="ФИО*"
                        value={name.value}
                        onBlur={() => name.onBlur()}
                        onChange={(e) => name.onChange(e)}
                      />
                      {name.isDirty && !name.inputValid && (
                        <div className="red">*</div>
                      )}
                    </div>
                    <div className="reg_form__item">
                      <img
                        className="img_input"
                        src="/img/email.png"
                        alt="Email"
                      />
                      <input
                        className="input_text"
                        type="text"
                        placeholder="Email*"
                        value={emailAdress.value}
                        onBlur={() => emailAdress.onBlur()}
                        onChange={(e) => emailAdress.onChange(e)}
                      />
                      {emailAdress.isDirty && !emailAdress.inputValid && (
                        <div className="red">*</div>
                      )}
                    </div>
                    <div className="reg_form__item">
                      <img
                        className="img_input"
                        src="/img/telephone.png"
                        alt="Телефон"
                      />
                      <input
                        className="input_text"
                        type="text"
                        value={phoneNumbers.value}
                        onBlur={() => phoneNumbers.onBlur()}
                        onChange={(e) => phoneNumbers.onChange(e)}
                        placeholder="Телефон*"
                      />
                      {phoneNumbers.isDirty && !phoneNumbers.inputValid && (
                        <div className="red">*</div>
                      )}
                    </div>
                    <div className="reg_form__item">
                      <img
                        className="img_input"
                        src="/img/organization.png"
                        alt="Организация"
                      />
                      <input
                        className="input_text"
                        type="text"
                        value={organization.value}
                        onBlur={() => organization.onBlur()}
                        onChange={(e) => organization.onChange(e)}
                        placeholder="Организация*"
                      />
                      {organization.isDirty && !organization.inputValid && (
                        <div className="red">*</div>
                      )}
                    </div>
                    <div className="reg_form__item">
                      <img
                        className="img_input"
                        src="/img/faculty.png"
                        alt="Факультет"
                      />
                      <input
                        className="input_text"
                        type="text"
                        value={universityFaculty.value}
                        onBlur={() => universityFaculty.onBlur()}
                        onChange={(e) => universityFaculty.onChange(e)}
                        placeholder="Факультет"
                      />
                      {universityFaculty.isDirty &&
                        !universityFaculty.inputValid && (
                          <div className="red">*</div>
                        )}
                    </div>
                    <div className="reg_form__item">
                      <img
                        className="img_input"
                        src="/img/course.png"
                        alt="Курс"
                      />
                      <input
                        className="input_text"
                        type="text"
                        value={universityCourse.value}
                        onBlur={() => universityCourse.onBlur()}
                        onChange={(e) => universityCourse.onChange(e)}
                        placeholder="Курс"
                      />
                      {universityCourse.isDirty &&
                        !universityCourse.inputValid && (
                          <div className="red">*</div>
                        )}
                    </div>
                    <input
                      type="button"
                      value="Отправить заявку на участие"
                      className="button"
                      onClick={() => {
                        openCod();
                      }}
                    />{" "}
                  </>
                )}
              </form>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};
