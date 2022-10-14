import { FC, useContext, useEffect, useState } from "react";
import dateFormat from "dateformat";
import { useNavigate, useParams } from "react-router-dom";
import { getEventOne, updateEvent } from "../../../http/eventAPI";
import { AdminLayout } from "../../../layouts/AdminLayout/AdminLayout";
import { ADMIN_EVENT_ROUTER } from "../../../utils/consts";
import "../Admin.css";
import { getTeamFree } from "../../../http/teamAPI";
import { getOrganizerFree } from "../../../http/organizerAPI";
import { getSponsorFree } from "../../../http/sponsorAPI";
import { Selects } from "../../../components/Selects/Selects";
import { getMaterialFree } from "../../../http/materialAPI";
import { Context } from "../../..";
import { useInput } from "../../../hooks/useInput";
import { Panel } from "../../../components/Panel/Panel";
import { ISelect } from "../../../types/ISelect";

export const AdminEventOne: FC = () => {
  const { modal, user } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    isHidden: "true",
  });

  const [freeTeams, setFreeTeams] = useState<ISelect[]>([]);
  const [selTeams, setSelTeams] = useState<ISelect[]>([]);
  const [freeOrg, setFreeOrg] = useState<ISelect[]>([]);
  const [selOrg, setSelOrg] = useState<ISelect[]>([]);
  const [freeSpon, setFreeSpon] = useState<ISelect[]>([]);
  const [selSpon, setSelSpon] = useState<ISelect[]>([]);
  const [freeMat, setFreeMat] = useState<ISelect[]>([]);
  const [selMat, setSelMat] = useState<ISelect[]>([]);
  const [teamValid, setTeamValid] = useState(true);
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
  const [imageE, setImageE] = useState("");
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
      setImage(imageE);
    }
  };
  const getData = async () => {
    if (id) {
      await getEventOne(id)
        .then(async (e) => {
          name.onBlur();
          description.onBlur();
          numberOfParticipants.onBlur();
          numberComands.onBlur();
          regulations.onBlur();
          results.onBlur();
          dateRegister.onBlur();
          dateCloseRegister.onBlur();
          dateStart.onBlur();
          datEnd.onBlur();
          timePublicationAdditionalMaterial.onBlur();
          name.setValue(e.name);
          description.setValue(e.description);
          numberOfParticipants.setValue(e.numberOfParticipants.toString());
          numberComands.setValue(e.numberComands.toString());
          regulations.setValue(e.regulations);
          results.setValue(e.results);
          dateRegister.setValue(
            dateFormat(e.dateRegister, "yyyy-mm-dd'T'HH:MM")
          );
          dateCloseRegister.setValue(
            dateFormat(e.dateCloseRegister, "yyyy-mm-dd'T'HH:MM")
          );
          dateStart.setValue(dateFormat(e.dateStart, "yyyy-mm-dd'T'HH:MM"));
          datEnd.setValue(dateFormat(e.datEnd, "yyyy-mm-dd'T'HH:MM"));
          timePublicationAdditionalMaterial.setValue(
            dateFormat(
              e.timePublicationAdditionalMaterial,
              "yyyy-mm-dd'T'HH:MM"
            )
          );
          setImage(e.image);
          if (typeof e.image === "string") setImageE(e.image);
          setData({ isHidden: String(e.isHidden) });
          e.event_sponsors.map((i) =>
            setSelSpon((prev) => [
              ...prev,
              { id: i.sponsor.id, name: i.sponsor.name },
            ])
          );
          e.event_organizers.map((i) =>
            setSelOrg((prev) => [
              ...prev,
              { id: i.organizer.id, name: i.organizer.name },
            ])
          );

          e.event_teams.map((i) =>
            setSelTeams((prev) => [
              ...prev,
              {
                id: i.team.id,
                name: i.team.name,
                count: i.team.team_participants.length,
                approvement: i.team.approvement,
              },
            ])
          );
          e.event_materials.map((i) =>
            setSelMat((prev) => [
              ...prev,
              { id: i.material.id, name: i.material.name },
            ])
          );

          await getOrganizerFree(id)
            .then((e) => {
              e.rows.map((i) =>
                setFreeOrg((prev) => [...prev, { id: i.id, name: i.name }])
              );
            })
            .catch((e) => {
              if (e.response.data.message === "Не авторизован") {
                modal.setIsVisible(true, "Ошибка, авторизуйтесь", true);
                user.setIsAuth(false);
                user.setUser(null);
              } else {
                modal.setIsVisible(true, "Ошибка", true);
              }
            });
          await getSponsorFree(id)
            .then((e) => {
              e.rows.map((i) =>
                setFreeSpon((prev) => [...prev, { id: i.id, name: i.name }])
              );
            })
            .catch((e) => {
              if (e.response.data.message === "Не авторизован") {
                modal.setIsVisible(true, "Ошибка, авторизуйтесь", true);
                user.setIsAuth(false);
                user.setUser(null);
              } else {
                modal.setIsVisible(true, "Ошибка", true);
              }
            });

          await getMaterialFree(id)
            .then((e) => {
              e.rows.map((i) =>
                setFreeMat((prev) => [...prev, { id: i.id, name: i.name }])
              );
            })
            .catch((e) => {
              if (e.response.data.message === "Не авторизован") {
                modal.setIsVisible(true, "Ошибка, авторизуйтесь", true);
                user.setIsAuth(false);
                user.setUser(null);
              } else {
                modal.setIsVisible(true, "Ошибка", true);
              }
            });
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

    await getTeamFree()
      .then((e) => {
        e.map((i) =>
          setFreeTeams((prev) => [
            ...prev,
            {
              id: i.id,
              name: i.name,
              count: i.team_participants.length,
              approvement: i.approvement,
            },
          ])
        );
      })
      .catch(() => {
        modal.setIsVisible(true, "Ошибка", true);
        setError(true);
      });

    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (
      parseInt(numberComands.value) >=
        selTeams.filter((i) => i.approvement === "Подтверждена").length &&
      selTeams.filter(
        (i) => i.count && i.count > parseInt(numberOfParticipants.value)
      ).length === 0
    ) {
      setTeamValid(true);
    } else {
      setTeamValid(false);
    }
  }, [numberComands, selTeams, numberOfParticipants]);
  const addEvent = () => {
    if (
      dateRegister.value <= dateCloseRegister.value &&
      dateCloseRegister.value <= dateStart.value &&
      dateStart.value <= datEnd.value &&
      teamValid &&
      name.inputValid &&
      datEnd.inputValid &&
      dateCloseRegister.inputValid &&
      dateRegister.inputValid &&
      dateStart.inputValid &&
      description.inputValid &&
      numberComands.inputValid &&
      numberOfParticipants.inputValid &&
      results.inputValid &&
      regulations.inputValid &&
      timePublicationAdditionalMaterial.inputValid
    ) {
      setLoading(true);
      const formData = new FormData();
      formData.append("id", id ? id : "");
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
      formData.append("teams", JSON.stringify(selTeams.map((i) => i.id)));
      formData.append("sponsors", JSON.stringify(selSpon.map((i) => i.id)));
      formData.append("materials", JSON.stringify(selMat.map((i) => i.id)));
      formData.append("organizers", JSON.stringify(selOrg.map((i) => i.id)));
      updateEvent(formData)
        .then(() => {
          modal.setIsVisible(true, "Успешно сохранено", false);
          navigate("../" + ADMIN_EVENT_ROUTER);
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
      <h1 className="adminmain-title">Cоревнование {name.value}</h1>
      <div className="adminmain-content shadow">
        <Panel
          add={addEvent}
          isAdd={false}
          path={ADMIN_EVENT_ROUTER}
          error={error}
        />
        {!error && (
          <form className="admincontent_wrapper">
            <div className="reg_admin__item">
              <div className="column">
                <label className="label mar">Назавние соревнования :</label>
                <label className="label mar">Статус :</label>
                <label className="label marg200">Описание :</label>
                <label className="label mar">Количество команд :</label>
                <label className="label mar">
                  Количество участиков в команде :
                </label>
                <label className="label marg200">Правила :</label>
                <label className="label marg200">Результаты :</label>
                <label className="label mar">Изображение :</label>
                <label className="label mar">Дата открытия регистрации :</label>
                <label className="label mar">Дата закрытия регистрации :</label>
                <label className="label mar">Дата начала соревнования :</label>
                <label className="label mar">
                  Дата закрытия соревнования :
                </label>
                <label className="label mar">
                  Дата публикации материалов :
                </label>
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
                  onChange={(e) => setData({ isHidden: e.target.value })}
                >
                  <option value="true">Скрытое</option>
                  <option value="false">Открытое</option>
                </select>
                <textarea
                  className={
                    description.isDirty && !description.inputValid
                      ? " textarea mar borderRed"
                      : " textarea mar"
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
                  className="mar"
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
                  onChange={(e) =>
                    timePublicationAdditionalMaterial.onChange(e)
                  }
                />
              </div>
            </div>
            <Selects
              name="команды"
              free={freeTeams}
              sel={selTeams}
              setSel={setSelTeams}
              setFree={setFreeTeams}
              valid={teamValid}
              numberComands={parseInt(numberComands.value)}
            />
            <Selects
              name="материалы"
              free={freeMat}
              sel={selMat}
              setSel={setSelMat}
              setFree={setFreeMat}
            />
            <Selects
              name="спонсоры"
              free={freeSpon}
              sel={selSpon}
              setSel={setSelSpon}
              setFree={setFreeSpon}
            />
            <Selects
              name="организаторы"
              free={freeOrg}
              sel={selOrg}
              setSel={setSelOrg}
              setFree={setFreeOrg}
            />
          </form>
        )}
      </div>
    </AdminLayout>
  );
};
