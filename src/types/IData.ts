import { IParticipant } from "./IParticipant";
import { ITeam } from "./ITeam";

export interface IData {
  id: number;
  name: string;
  team_participants?: [{ team: ITeam }] | [{ participant: IParticipant }];
  approvement?: string;
  dateRegister?: Date;
  dateCloseRegister?: Date;
  dateStart?: Date;
  isHidden?: boolean;
  datEnd?: Date;
}
export interface IDatas {
  count: number;
  rows: IData[];
  dateNow?: Date;
}
