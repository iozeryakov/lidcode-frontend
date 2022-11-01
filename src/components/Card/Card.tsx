import { FC } from "react";
import { Link } from "react-router-dom";
import { IEvent } from "../../types/IEvent";
import { compareDate } from "../../utils/compare";
import { API_IMG, EVENT_ROUTER } from "../../utils/consts";
import "./Card.css";
interface IProps {
  data: IEvent;
  dateNow: Date;
}

export const Card: FC<IProps> = ({ data, dateNow }: IProps) => {
  return (
    <div className="card-content">
      <div className="card_info">
        <Link className="card_name" to={EVENT_ROUTER + "/" + data.id}>
          {data.name}
        </Link>
        <p className="info__p">
          {data.numberOfParticipants > 1
            ? "Командноеное участие"
            : "Одиночное участие"}
        </p>
        <p className="info__p">
          {compareDate(
            dateNow,
            data.dateRegister,
            data.dateCloseRegister,
            data.dateStart,
            data.datEnd
          )}
        </p>
        <h2 className="info__h2">Описание:</h2>
        <span className="card_description">{data.description}</span>
      </div>
      <div className="card_img">
        <Link to={EVENT_ROUTER + "/" + data.id}>
          <img
            className="img"
            src={API_IMG + data.image}
            alt="Название соревнования"
          />
        </Link>
        <Link className="button" to={EVENT_ROUTER + "/" + data.id}>
          Подробнее...
        </Link>
      </div>
    </div>
  );
};
