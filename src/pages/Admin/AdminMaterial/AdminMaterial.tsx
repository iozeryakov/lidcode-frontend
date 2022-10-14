import { FC, useState } from "react";
import { AdminContentAll } from "../../../components/AdminContentAll/AdminContentAll";
import { deleteMaterial, getMaterialAll } from "../../../http/materialAPI";
import { AdminLayout } from "../../../layouts/AdminLayout/AdminLayout";
import { IData } from "../../../types/IData";
import "../Admin.css";

export const AdminMaterial: FC = () => {
  const [loading, setLoading] = useState(true);
  const getInfo = (data: IData) => {
    return "";
  };
  return (
    <AdminLayout loading={loading}>
      <AdminContentAll
        name="Материалы"
        getInfo={getInfo}
        setLoading={setLoading}
        get={getMaterialAll}
        delette={deleteMaterial}
      />
    </AdminLayout>
  );
};
