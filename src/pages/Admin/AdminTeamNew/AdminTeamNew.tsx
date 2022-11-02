import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../..";
import { Panel } from "../../../components/Panel/Panel";
import { useInput } from "../../../hooks/useInput";
import { getParticipantFree } from "../../../http/participantAPI";
import { createNew } from "../../../http/teamAPI";

import { AdminLayout } from "../../../layouts/AdminLayout/AdminLayout";
import { IInfo } from "../../../types/ITeam";
import { ADMIN_TEAM_ROUTER } from "../../../utils/consts";
import "../Admin.css";

export const AdminTeamNew: FC = () => {
  const { modal, user } = useContext(Context);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    isDirtySel: false,
    isCoach: "0",
    isDirtyCoach: false,
    isDirtyContactFace: false,
    isContactFace: "0",
  });
  const name = useInput("", {
    minLength: 3,
    maxLength: 50,
    isEmpty: true,
  });
  const [freePart, setFreePart] = useState<IInfo[]>([]);
  const [selPart, setSelPart] = useState<IInfo[]>([]);
  const [eventFree, setEventFree] =
    useState<HTMLCollectionOf<HTMLOptionElement>>();
  const [eventSel, setEventSel] =
    useState<HTMLCollectionOf<HTMLOptionElement>>();
  const getData = async () => {
    const data = await getParticipantFree();
    data.map((i) =>
      setFreePart((prev) => [...prev, { id: i.id, name: i.name }])
    );
  };
  useEffect(() => {
    getData();
  }, []);
  const add = () => {
    if (eventFree)
      for (let i = 0; i < eventFree.length; i++) {
        const el = freePart.filter(
          ({ id }) => id === Number(eventFree[i].value)
        )[0];
        setSelPart((prev) => [...prev, { id: el.id, name: el.name }]);
        setFreePart((prev) =>
          prev.filter(({ id }) => id !== Number(eventFree[i].value))
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
    if (eventSel)
      for (let i = 0; i < eventSel.length; i++) {
        const el = selPart.filter(
          ({ id }) => id === Number(eventSel[i].value)
        )[0];
        setFreePart((prev) => [...prev, { id: el.id, name: el.name }]);
        if (eventSel[i].value === data.isCoach)
          setData((prev) => ({
            ...prev,
            isCoach: "0",
          }));
        if (eventSel[i].value === data.isContactFace)
          setData((prev) => ({
            ...prev,
            isContactFace: "0",
          }));
        setSelPart((prev) =>
          prev.filter(({ id }) => id !== Number(eventSel[i].value))
        );
      }
  };
  const addTeam = () => {
    name.onBlur();
    setData((prev) => ({
      ...prev,
      isDirtyCoach: true,
      isDirtyContactFace: true,
      isDirtySel: true,
    }));
    if (
      name.inputValid &&
      selPart.length !== 0 &&
      data.isCoach !== "0" &&
      data.isContactFace !== "0"
    ) {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("isCoach", data.isCoach);
      formData.append("isContactFace", data.isContactFace);
      formData.append("participants", JSON.stringify(selPart.map((i) => i.id)));
      createNew(formData)
        .then(() => {
          modal.setIsVisible(true, "Успешно добавлено", false);
          navigate("../" + ADMIN_TEAM_ROUTER);
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
      <h1 className="adminmain-title">Добавить команду</h1>
      <div className="adminmain-content shadow">
        <Panel
          add={addTeam}
          isAdd={true}
          path={ADMIN_TEAM_ROUTER}
          error={false}
        />
        <form className="admincontent_wrapper">
          <div className="reg_admin__item">
            <div className="column">
              <label className="label mar">Назавние команды :</label>
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
            </div>
          </div>
          <div className="reg_admin__item">
            <div className="column">
              <label className="label mar">Свободные участники :</label>
              <select
                className="selectml"
                onChange={(e) => {
                  setEventFree(e.target.selectedOptions);
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
              <label className="label mar">Выбранные участники :</label>
              <select
                className={
                  data.isDirtySel && selPart.length === 0
                    ? "selectml borderRed"
                    : "selectml"
                }
                onBlur={() =>
                  setData((prev) => ({ ...prev, isDirtySel: true }))
                }
                onChange={(e) => {
                  setEventSel(e.target.selectedOptions);
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
                onBlur={() =>
                  setData((prev) => ({ ...prev, isDirtyContactFace: true }))
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
                onBlur={() =>
                  setData((prev) => ({ ...prev, isDirtyCoach: true }))
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
      </div>
    </AdminLayout>
  );
};
