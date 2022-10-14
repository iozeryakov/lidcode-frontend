import { FC, useState } from "react";
import { AdminContentAll } from "../../../components/AdminContentAll/AdminContentAll";
import { deleteOrganizer, getOrganizerAll } from "../../../http/organizerAPI";
import { AdminLayout } from "../../../layouts/AdminLayout/AdminLayout";
import { IData } from "../../../types/IData";
import "../Admin.css";

export const AdminOrganizer: FC = () => {
  const [loading, setLoading] = useState(true);
  const getInfo = (data: IData) => {
    return "";
  };
  return (
    <AdminLayout loading={loading}>
      <AdminContentAll
        name="Организаторы"
        getInfo={getInfo}
        setLoading={setLoading}
        delette={deleteOrganizer}
        get={getOrganizerAll}
      />
    </AdminLayout>
  );
};
