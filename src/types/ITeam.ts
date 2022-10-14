import { IEvent } from "./IEvent";
import { IParticipant } from "./IParticipant";

export interface ITeam {
  id: number;
  name: string;
  approvement: string;
  ContactFaceId: number;
  CoachFaceId: number;
  event_teams: [{ event: IEvent }];
  token: string;
  team_participants: [{ participant: IParticipant }];
}

export interface ITeams {
  count: number;
  rows: ITeam[];
  token: string;
}
export interface IInfo {
  id: number;
  name: string;
}
