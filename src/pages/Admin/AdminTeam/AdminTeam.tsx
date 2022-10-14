import { FC, useState } from "react";
import { AdminContentAll } from "../../../components/AdminContentAll/AdminContentAll";
import { deleteTeam, getTeamAll } from "../../../http/teamAPI";
import { AdminLayout } from "../../../layouts/AdminLayout/AdminLayout";
import { IData } from "../../../types/IData";
import "../Admin.css";

export const AdminTeam: FC = () => {
  const [loading, setLoading] = useState(true);
  const getInfo = (data: IData) => {
    if (data.approvement) {
      return data.approvement;
    } else {
      return "";
    }
  };
  return (
    <AdminLayout loading={loading}>
      <AdminContentAll
        name="Команды"
        getInfo={getInfo}
        setLoading={setLoading}
        delette={deleteTeam}
        get={getTeamAll}
      />
    </AdminLayout>
  );
};
