import { FC, useEffect, useState } from "react";
import dateFormat from "dateformat";
import { Link, useParams } from "react-router-dom";
import { getEventOne } from "../../http/eventAPI";
import { MainLayout } from "../../layouts/MainLayout/MainLayout";
import { IEvent } from "../../types/IEvent";
import { compareDate } from "../../utils/compare";
import {
  API_IMG,
  REGISTRATIONTM_ROUTER,
  REGISTRATION_ROUTER,
} from "../../utils/consts";
import "./Event.css";

export const Event: FC = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [info, setInfo] = useState<IEvent>();
  const [date, setDate] = useState("");

  const getData = async () => {
    if (id) {
      await getEventOne(id.toString())
        .then((e) => {
          setDate(
            compareDate(
              e.dateNow,
              e.dateRegister,
              e.dateCloseRegister,
              e.dateStart,
              e.datEnd
            )
          );
          setInfo(e);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const dateInfo = () => {
    if (info)
      switch (date) {
        case "Ожидание регистрации":
          return (
            "Регистрация откроется " +
            dateFormat(info.dateRegister, "yyyy-mm-dd' - 'HH:MM")
          );
        case "Регистрация открыта":
          return (
            "Регистрация закроется " +
            dateFormat(info.dateCloseRegister, "yyyy-mm-dd' - 'HH:MM")
          );
        case "Регистрация закрыта":
          return (
            "Соревнование откроется " +
            dateFormat(info.dateStart, "yyyy-mm-dd' - 'HH:MM")
          );
        case "Соревнование открыто":
          return (
            "Соревнование закроется " +
            dateFormat(info.datEnd, "yyyy-mm-dd' - 'HH:MM")
          );
      }
    return date;
  };
  return (
    <MainLayout loading={loading}>
      <div className="main-wrapper">
        <div className="main-content">
          {info && !info.isHidden ? (
            <>
              <h1 className="main-title">{info.name}</h1>
              <section className="section-title">
                <img
                  className="img"
                  src={API_IMG + info.image}
                  alt="Название соревнования"
                />
                <div className="section-title_info">
                  <p className="info__p">
                    {info.numberOfParticipants === 1
                      ? "Одиночное участие"
                      : "Командное участие"}
                  </p>
                  <p className="info__p">{dateInfo()}</p>

                  {date === "Регистрация открыта" ? (
                    info.event_teams.filter(
                      (i) => i.team.approvement === "Подтверждена"
                    ).length < info.numberComands ? (
                      <Link
                        className="button button_reg"
                        to={
                          info.numberOfParticipants === 1
                            ? "../../" + REGISTRATION_ROUTER + "/" + info.id
                            : "../../" + REGISTRATIONTM_ROUTER + "/" + info.id
                        }
                      >
                        Регистрация на участие
                      </Link>
                    ) : (
                      <p className="info__p">{"Мест нет"}</p>
                    )
                  ) : (
                    <></>
                  )}
                </div>
              </section>
              <section>
                <h2 className="info__h2">Описание:</h2>
                <div className="section_info">{info.description}</div>
              </section>
              <section>
                <h2 className="info__h2">Правила:</h2>
                <div className="section_info">{info.regulations}</div>
              </section>
              {date === "Соревнование закрыто" && (
                <section>
                  <h2 className="info__h2">Результаты:</h2>
                  <div className="section_info">{info.results}</div>
                </section>
              )}
              <section>
                <h2 className="info__h2">Расписание:</h2>
                <div className="section">
                  <div>
                    <div className="section_info">Открытие регистрации:</div>
                    <div className="section_info">Завершение регистрации:</div>
                    <div className="section_info">Старт соревнований:</div>
                    <div className="section_info">Завершение соревнований:</div>
                  </div>
                  <div>
                    <div className="section_info">
                      {dateFormat(info.dateRegister, "yyyy-mm-dd' - 'HH:MM")}
                    </div>
                    <div className="section_info">
                      {dateFormat(
                        info.dateCloseRegister,
                        "yyyy-mm-dd' - 'HH:MM"
                      )}
                    </div>
                    <div className="section_info">
                      {dateFormat(info.dateStart, "yyyy-mm-dd' - 'HH:MM")}
                    </div>
                    <div className="section_info">
                      {dateFormat(info.dateStart, "yyyy-mm-dd' - 'HH:MM")}
                    </div>
                  </div>
                </div>
              </section>
              <section>
                <h2 className="info__h2">Материалы:</h2>
                <ul>
                  {new Date(
                    dateFormat(info.dateNow, "yyyy-mm-dd'T'HH:MM:ss", true)
                  ) >=
                  new Date(
                    dateFormat(
                      info.timePublicationAdditionalMaterial,
                      "yyyy-mm-dd'T'HH:MM"
                    )
                  ) ? (
                    info.event_materials.length > 0 ? (
                      info.event_materials.map((i) => (
                        <li key={i.material.id}>
                          <a
                            className="section_materials"
                            href={i.material.link}
                          >
                            {i.material.name}
                          </a>
                        </li>
                      ))
                    ) : (
                      <div className="section_info">
                        Нет доступных материалов
                      </div>
                    )
                  ) : (
                    <div className="section_info">
                      {"Материалы будут доступны: " +
                        dateFormat(
                          info.timePublicationAdditionalMaterial,
                          " yyyy-mm-dd' - 'HH:MM"
                        )}
                    </div>
                  )}
                </ul>
              </section>
              <section className="section-org">
                <div className="section">
                  {info.event_organizers.length > 0 && (
                    <div className="organizers">
                      <h2 className="info__h2">Организаторы:</h2>
                      <ul className="ul_organizers">
                        {info.event_organizers.map((i) => (
                          <li key={i.organizer.id}>
                            <a
                              className="section_materials"
                              href={i.organizer.link}
                            >
                              <img
                                className="img_org"
                                src={API_IMG + i.organizer.image}
                                alt={i.organizer.name}
                              />
                              {" — " + i.organizer.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {info.event_sponsors.length > 0 && (
                    <div className="organizers">
                      <h2 className="info__h2">Спонсоры:</h2>
                      <ul className="ul_organizers">
                        {info.event_sponsors.map((i) => (
                          <li key={i.sponsor.id}>
                            <a
                              className="section_materials"
                              href={i.sponsor.link}
                            >
                              <img
                                className="img_org"
                                src={API_IMG + i.sponsor.image}
                                alt={i.sponsor.name}
                              />
                              {" — " + i.sponsor.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            </>
          ) : (
            <h1 className="main-title">Упс... Такого соревнования нет!</h1>
          )}
        </div>
      </div>
    </MainLayout>
  );
};
