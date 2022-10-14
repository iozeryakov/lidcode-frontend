import { FC, useState } from "react";
import { AdminContentAll } from "../../../components/AdminContentAll/AdminContentAll";
import { deleteSponsor, getSponsorAll } from "../../../http/sponsorAPI";
import { AdminLayout } from "../../../layouts/AdminLayout/AdminLayout";
import { IData } from "../../../types/IData";
import "../Admin.css";

export const AdminSponsor: FC = () => {
  const [loading, setLoading] = useState(true);
  const getInfo = (data: IData) => {
    return "";
  };
  return (
    <AdminLayout loading={loading}>
      <AdminContentAll
        name="Спонсоры"
        getInfo={getInfo}
        setLoading={setLoading}
        delette={deleteSponsor}
        get={getSponsorAll}
      />
    </AdminLayout>
  );
};
