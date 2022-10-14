import { FC, useContext, useEffect, useState } from "react";
import { FormReg } from "../../components/FormReg/FormReg";
import { MainLayout } from "../../layouts/MainLayout/MainLayout";
import { createTeam, getCod } from "../../http/teamAPI";
import "./RegistrationTm.css";
import { useNavigate, useParams } from "react-router-dom";
import { getEventOne } from "../../http/eventAPI";
import { compareDate } from "../../utils/compare";
import { Context } from "../..";
import { useInput } from "../../hooks/useInput";
import { EVENT_ROUTER } from "../../utils/consts";
import { Confirmation } from "../../components/Confirmation/Confirmation";
import { IInputs } from "../../types/IInputs";

export const RegistrationTm: FC = () => {
  const navigate = useNavigate();
  const { modal } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const [contactId, setContactId] = useState(-1);
  const [contact, setContact] = useState(false);
  const [coachId, setCoachId] = useState(-1);
  const [coach, setCoach] = useState(false);
  const [max, setMax] = useState(0);
  const [mycod, setMycod] = useState("");
  const name = useInput("", {
    minLength: 3,
    maxLength: 50,
    isEmpty: true,
  });

  const [inputs, setInputs] = useState<IInputs[]>([
    {
      name: "",
      emailAdress: "",
      phoneNumbers: "",
      organization: "",
      universityFaculty: "",
      universityCourse: "",
      isCoach: false,
      isContactFace: false,
      valid: false,
    },
  ]);
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
          setMax(e.numberOfParticipants);
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
            e.numberOfParticipants < 2
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
  const addInfo = () => {
    setInputs((prev) => [
      ...prev,
      {
        name: "",
        emailAdress: "",
        phoneNumbers: "",
        organization: inputs[inputs.length - 1].organization,
        universityFaculty: inputs[inputs.length - 1].universityFaculty,
        universityCourse: inputs[inputs.length - 1].universityCourse,
        isCoach: false,
        isContactFace: false,
        valid: false,
      },
    ]);
  };
  const removeInfo = (number: number) => {
    if (contactId === number) {
      setContactId(-1);
      setContact(false);
    }
    if (contactId > number) {
      setContactId((prev) => prev - 1);
    }
    if (coachId === number) {
      setCoachId(-1);
      setCoach(false);
    }
    if (coachId > number) {
      setCoachId((prev) => prev - 1);
    }
    setInputs(inputs.filter((i, index) => index !== number));
  };

  const changeInfo = (key: string, value: boolean | string, number: number) => {
    setInputs((prev) =>
      prev.map((i, index) => (index === number ? { ...i, [key]: value } : i))
    );
    if (typeof value === "boolean") {
      if (key === "isContactFace") {
        setContact(value);
        if (value) {
          setContactId(number);
        } else {
          setContactId(-1);
        }
      } else if (key === "isCoach") {
        setCoach(value);
        if (value) {
          setCoachId(number);
        } else {
          setCoachId(-1);
        }
      }
    }
  };
  const openCod = () => {
    name.onBlur();
    if (
      coach &&
      contact &&
      name.inputValid &&
      inputs.length === inputs.filter((i) => i.valid).length
    ) {
      setLoading(true);
      getCod(inputs[contactId].emailAdress)
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
      formData.append("participants", JSON.stringify(inputs));
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
              <form className={isOpenCod ? "reg_form" : "from_reg"}>
                {isOpenCod ? (
                  <Confirmation
                    addTeam={addTeam}
                    setIsOpenCod={setIsOpenCod}
                    cod={cod}
                    email={inputs[contactId].emailAdress}
                  />
                ) : (
                  <>
                    <div className="reg_form__item item_margin">
                      <img
                        className="img_input"
                        src="/img/team.png"
                        alt="Название команды"
                      />
                      <input
                        className="input_text"
                        type="text"
                        placeholder="Название команды*"
                        value={name.value}
                        onChange={(e) => name.onChange(e)}
                        onBlur={() => name.onBlur()}
                      />
                      {name.isDirty && !name.inputValid && (
                        <div className="red">*</div>
                      )}
                    </div>
                    {inputs.map((i, index) => (
                      <FormReg
                        key={index}
                        contact={contact}
                        index={index}
                        contactId={contactId}
                        changeInfo={changeInfo}
                        remove={removeInfo}
                        coach={coach}
                        coachId={coachId}
                        i={i}
                      />
                    ))}
                    {max > inputs.length && (
                      <input
                        type="button"
                        className="button button_reg"
                        value="Добавить участника"
                        onClick={() => {
                          addInfo();
                        }}
                      />
                    )}

                    <input
                      type="button"
                      className="button"
                      value=" Отправить заявку на участие"
                      onClick={() => {
                        openCod();
                      }}
                    />
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
