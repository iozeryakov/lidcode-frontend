import { IMaterial } from "./IMaterial";
import { IOrgSpon } from "./IOrgSpon";
import { ITeam } from "./ITeam";

export interface IEvent {
  id: number;
  name: string;
  isHidden: boolean;
  description: string;
  numberOfParticipants: number;
  numberComands: number;
  regulations: string;
  results: string;
  image: string | File;
  dateRegister: Date;
  dateCloseRegister: Date;
  dateStart: Date;
  datEnd: Date;
  dateNow: Date;
  event_materials: [{ material: IMaterial }];
  event_teams: [{ team: ITeam }];
  event_organizers: [{ organizer: IOrgSpon }];
  event_sponsors: [{ sponsor: IOrgSpon }];
  timePublicationAdditionalMaterial: Date;
}
export interface IEvents {
  dateNow: Date;
  count: number;
  token: string;
  rows: IEvent[];
}
