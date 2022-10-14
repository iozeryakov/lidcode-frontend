import { FC, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../../..";
import { Panel } from "../../../components/Panel/Panel";
import { useInput } from "../../../hooks/useInput";
import { getParticipantFree } from "../../../http/participantAPI";
import { getTeam, updateTeam } from "../../../http/teamAPI";

import { AdminLayout } from "../../../layouts/AdminLayout/AdminLayout";
import { IInfo } from "../../../types/ITeam";
import { ADMIN_EVENT_ROUTER, ADMIN_TEAM_ROUTER } from "../../../utils/consts";
import "../Admin.css";

export const AdminTeamOne: FC = () => {
  const { modal, user } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [max, setMax] = useState(1000);
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    isDirtySel: false,
    approvement: "Ожидает",
    isCoach: "0",
    isDirtyCoach: false,
    isDirtyContactFace: false,
    isContactFace: "0",
    now: 0,
    max: 0,
  });
  const setApprovement = (approvement: string) => {
    if (link.name) {
      if (approvement === "Подтверждена" && data.approvement !== approvement) {
        if (data.max >= data.now + 1) {
          setData((prev) => ({ ...prev, approvement: approvement }));
        } else {
          modal.setIsVisible(true, "Нет свободных мест", true);
        }
      } else {
        setData((prev) => ({ ...prev, approvement: approvement }));
      }
    } else {
      modal.setIsVisible(true, "Нет заявки на соревнование", true);
    }
  };
  const name = useInput("", {
    minLength: 3,
    maxLength: 50,
    isEmpty: true,
  });
  const [link, setLink] = useState({
    name: "",
    link: "../" + ADMIN_EVENT_ROUTER,
  });
  const [freePart, setFreePart] = useState<IInfo[]>([]);
  const [selPart, setSelPart] = useState<IInfo[]>([]);
  const [eFree, setEFree] = useState<HTMLCollectionOf<HTMLOptionElement>>();
  const [eSel, setESel] = useState<HTMLCollectionOf<HTMLOptionElement>>();
  const getData = async () => {
    if (id) {
      await getTeam(id)
        .then(async (e) => {
          name.setValue(e.name);
          setData((prev) => ({
            ...prev,
            isCoach: e.CoachFaceId.toString(),
            isContactFace: e.ContactFaceId.toString(),
            approvement: e.approvement,
            isDirtyCoach: true,
            isDirtyContactFace: true,
            now: e.event_teams[0].event.event_teams.filter(
              (i) => i.team.approvement === "Подтверждена"
            ).length,
            max: e.event_teams[0].event.numberComands,
          }));
          name.onBlur();
          if (e.event_teams[0]) {
            setMax(e.event_teams[0].event.numberOfParticipants);
            setLink((prev) => ({
              name: e.event_teams[0].event.name,
              link: prev.link + "/" + e.event_teams[0].event.id,
            }));
          }
          e.team_participants.map(
            (i) =>
              setSelPart((prev) => [
                ...prev,
                { id: i.participant.id, name: i.participant.name },
              ]),
            setData((prev) => ({ ...prev, isDirtySel: true }))
          );
          await getParticipantFree()
            .then((e) => {
              e.map((i) =>
                setFreePart((prev) => [...prev, { id: i.id, name: i.name }])
              );
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
  const add = () => {
    if (eFree)
      for (let i = 0; i < eFree.length; i++) {
        const el = freePart.filter(
          ({ id }) => id === Number(eFree[i].value)
        )[0];

        setSelPart((prev) => [...prev, { id: el.id, name: el.name }]);
        setFreePart((prev) =>
          prev.filter(({ id }) => id !== Number(eFree[i].value))
        );
      }
  };
  const addAll = () => {
    setSelPart((prev) => [...prev, ...freePart]);
    setFreePart([]);
  };
  const dellAll = () => {
    setFreePart((prev) => [...prev, ...selPart]);
    setData((prev) => ({
      ...prev,
      isCoach: "0",
    }));
    setData((prev) => ({
      ...prev,
      isContactFace: "0",
    }));
    setSelPart([]);
  };
  const dell = () => {
    if (eSel)
      for (let i = 0; i < eSel.length; i++) {
        const el = selPart.filter(({ id }) => id === Number(eSel[i].value))[0];
        setFreePart((prev) => [...prev, { id: el.id, name: el.name }]);
        if (eSel[i].value === data.isCoach)
          setData((prev) => ({
            ...prev,
            isCoach: "0",
          }));
        if (eSel[i].value === data.isContactFace)
          setData((prev) => ({
            ...prev,
            isContactFace: "0",
          }));
        setSelPart((prev) =>
          prev.filter(({ id }) => id !== Number(eSel[i].value))
        );
      }
  };
  const addTeam = () => {
    if (
      name.inputValid &&
      selPart.length <= max &&
      selPart.length !== 0 &&
      data.isCoach !== "0" &&
      data.isContactFace !== "0"
    ) {
      setLoading(true);
      const formData = new FormData();
      id && formData.append("id", id);
      formData.append("name", name.value);
      formData.append("isCoach", data.isCoach);
      formData.append("approvement", data.approvement);
      formData.append("isContactFace", data.isContactFace);
      formData.append("participants", JSON.stringify(selPart.map((i) => i.id)));
      updateTeam(formData)
        .then(() => {
          modal.setIsVisible(true, "Успешно сохранено", false);
          navigate("../" + ADMIN_TEAM_ROUTER);
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
      <h1 className="adminmain-title">Команда {name.value}</h1>
      <div className="adminmain-content shadow">
        <Panel
          add={addTeam}
          isAdd={false}
          path={ADMIN_TEAM_ROUTER}
          error={error}
        />
        {!error && (
          <form className="admincontent_wrapper">
            <div className="reg_admin__item">
              <div className="column">
                <label className="label mar">Ссылка на соревнование:</label>
                <label className="label mar">Назавние команды:</label>
                <label className="label mar">Статус заявки на участие:</label>
              </div>
              <div className="column">
                {link.name === "" ? (
                  <label className="label mar">
                    Нет заявки на соревнование
                  </label>
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
                  onBlur={() => name.onBlur()}
                  onChange={(e) => name.onChange(e)}
                  placeholder="Не заполнено*"
                />
                <select
                  className="select mar"
                  value={data.approvement}
                  onChange={(e) => {
                    setApprovement(e.target.value);
                  }}
                >
                  <option value="Ожидает">Ожидает</option>
                  <option value="Подтверждена">Подтверждена</option>
                  <option value="Отменена">Отменена</option>
                </select>
              </div>
            </div>
            <div className="reg_admin__item">
              <div className="column">
                <label className="label mar">Свободные участники :</label>
                <select
                  className="selectml"
                  onChange={(e) => {
                    setEFree(e.target.selectedOptions);
                  }}
                  size={9}
                  multiple
                >
                  {freePart
                    .sort((a, b) => {
                      if (a.id < b.id) {
                        return 1;
                      }
                      if (a.id > b.id) {
                        return -1;
                      }

                      return 0;
                    })
                    .map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="column ">
                <input
                  type="button"
                  className="button_del"
                  value=">"
                  onClick={() => {
                    add();
                  }}
                />
                <input
                  type="button"
                  className="button_del"
                  value=">>"
                  onClick={() => {
                    addAll();
                  }}
                />
                <input
                  type="button"
                  className="button_del"
                  value="<<"
                  onClick={() => {
                    dellAll();
                  }}
                />
                <input
                  type="button"
                  className="button_del"
                  value="<"
                  onClick={() => {
                    dell();
                  }}
                />
              </div>
              <div className="column">
                <label className="label mar">
                  {"Выбранные участники (max " + max + "):"}
                </label>
                <select
                  className={
                    data.isDirtySel &&
                    (selPart.length === 0 || selPart.length > max)
                      ? "selectml borderRed"
                      : "selectml"
                  }
                  onChange={(e) => {
                    setESel(e.target.selectedOptions);
                  }}
                  size={9}
                  multiple
                >
                  {selPart
                    .sort((a, b) => {
                      if (a.id < b.id) {
                        return 1;
                      }
                      if (a.id > b.id) {
                        return -1;
                      }
                      return 0;
                    })
                    .map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="reg_admin__item">
              <div className="column">
                <label className="label mar">Выберите контактное лицо:</label>
                <label className="label mar">Выберите тренера:</label>
              </div>
              <div className="column">
                <select
                  className={
                    data.isDirtyContactFace && data.isContactFace === "0"
                      ? "select mar borderRed"
                      : "select mar"
                  }
                  value={data.isContactFace}
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      isContactFace: e.target.value,
                    }));
                  }}
                >
                  <option value="0" hidden>
                    Выбрать
                  </option>
                  {selPart
                    .sort((a, b) => {
                      if (a.id < b.id) {
                        return 1;
                      }
                      if (a.id > b.id) {
                        return -1;
                      }
                      return 0;
                    })
                    .map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                </select>
                <select
                  className={
                    data.isDirtyCoach && data.isCoach === "0"
                      ? "select mar borderRed"
                      : "select mar"
                  }
                  value={data.isCoach}
                  onChange={(e) => {
                    setData((prev) => ({ ...prev, isCoach: e.target.value }));
                  }}
                >
                  <option value="0" hidden>
                    Выбрать
                  </option>
                  {selPart
                    .sort((a, b) => {
                      if (a.id < b.id) {
                        return 1;
                      }
                      if (a.id > b.id) {
                        return -1;
                      }
                      return 0;
                    })
                    .map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
};
