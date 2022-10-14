import { FC, useState } from "react";
import { AdminContentAll } from "../../../components/AdminContentAll/AdminContentAll";
import { compareDate } from "../../../utils/compare";
import { deleteEvent, getEventAll } from "../../../http/eventAPI";
import { AdminLayout } from "../../../layouts/AdminLayout/AdminLayout";
import { IData } from "../../../types/IData";
import "../Admin.css";
export const AdminEvent: FC = () => {
  const [loading, setLoading] = useState(true);
  const getInfo = (data: IData, dateNow?: Date) => {
    if (
      dateNow &&
      !data.isHidden &&
      data.dateRegister &&
      data.dateCloseRegister &&
      data.dateStart &&
      data.datEnd
    ) {
      return compareDate(
        dateNow,
        data.dateRegister,
        data.dateCloseRegister,
        data.dateStart,
        data.datEnd
      );
    }
    return "Соревнование скрыто";
  };
  return (
    <AdminLayout loading={loading}>
      <AdminContentAll
        name="Соревнования"
        getInfo={getInfo}
        setLoading={setLoading}
        delette={deleteEvent}
        get={getEventAll}
      />
    </AdminLayout>
  );
};
