import { ITeam } from "./ITeam";

export interface IParticipant {
  id: number;
  name: string;
  emailAdress: string;
  organization: string;
  phoneNumbers: string;
  universityCourse: string;
  universityFaculty: string;
  team_participants: [{ team: ITeam }];
  token: string;
}
export interface IParticipants {
  count: number;
  rows: IParticipant[];
  token: string;
}
