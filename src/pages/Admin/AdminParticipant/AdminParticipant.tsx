import { FC, useState } from "react";
import { AdminContentAll } from "../../../components/AdminContentAll/AdminContentAll";
import {
  deleteParticipant,
  getParticipantAll,
} from "../../../http/participantAPI";
import { AdminLayout } from "../../../layouts/AdminLayout/AdminLayout";
import { IData } from "../../../types/IData";
import "../Admin.css";

export const AdminParticipant: FC = () => {
  const [loading, setLoading] = useState(true);
  const getInfo = (data: IData) => {
    if (data.team_participants) {
      if (data.team_participants.length > 0) {
        return "состоит в команде";
      }
      return "не состоит в команде";
    } else {
      return "";
    }
  };
  return (
    <AdminLayout loading={loading}>
      <AdminContentAll
        name="Участники"
        getInfo={getInfo}
        setLoading={setLoading}
        delette={deleteParticipant}
        get={getParticipantAll}
      />
    </AdminLayout>
  );
};
