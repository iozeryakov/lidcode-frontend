import { ITeam, ITeams } from "../types/ITeam";
import { $authHost, $host } from "./index";
interface ICod {
  cod: string;
}
export const getTeamAll = async (page: number) => {
  const controller = new AbortController();
  const data: ITeams = await (
    await $authHost.get("api/team/?page=" + page).finally(() => {
      controller.abort();
    })
  ).data;
  localStorage.setItem("token", data.token);
  return data;
};
export const getCod = async (emailAdress: any) => {
  const controller = new AbortController();
  const data: ICod = await (
    await $host
      .get("api/team/email/?emailAdress=" + emailAdress)
      .finally(() => {
        controller.abort();
      })
  ).data;
  return data;
};
export const getTeam = async (id: string) => {
  const controller = new AbortController();
  const data: ITeam = await (
    await $authHost.get("api/team/" + id).finally(() => {
      controller.abort();
    })
  ).data;
  localStorage.setItem("token", data.token);
  return data;
};
export const getTeamFree = async () => {
  const controller = new AbortController();
  const data: ITeams = await (
    await $authHost.get("api/team/free").finally(() => {
      controller.abort();
    })
  ).data;
  localStorage.setItem("token", data.token);
  return data.rows;
};
export const createTeam = async (team: any) => {
  const controller = new AbortController();
  const data = await $host.post("api/team/", team).finally(() => {
    controller.abort();
  });
  return data;
};
export const updateTeam = async (team: any) => {
  const controller = new AbortController();
  const { data } = await $authHost.post("api/team/update", team).finally(() => {
    controller.abort();
  });
  localStorage.setItem("token", data.token);
};
export const createNew = async (team: any) => {
  const controller = new AbortController();
  const { data } = await $authHost.post("api/team/new", team).finally(() => {
    controller.abort();
  });
  localStorage.setItem("token", data.token);
  return data;
};
export const deleteTeam = async (id: any) => {
  const controller = new AbortController();
  const { data } = await $authHost.post("api/team/delete/", id).finally(() => {
    controller.abort();
  });
  localStorage.setItem("token", data.token);
};
