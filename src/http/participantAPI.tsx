import { IParticipant, IParticipants } from "../types/IParticipant";
import { $authHost } from "./index";
export const getParticipantAll = async (page: number) => {
  const controller = new AbortController();
  const data: IParticipants = await (
    await $authHost.get("api/participant/?page=" + page).finally(() => {
      controller.abort();
    })
  ).data;
  localStorage.setItem("token", data.token);
  return data;
};
export const updateParticipant = async (participant: any) => {
  const controller = new AbortController();
  const { data } = await $authHost
    .post("api/participant/update/", participant)
    .finally(() => {
      controller.abort();
    });
  localStorage.setItem("token", data.token);
};
export const getParticipant = async (id: string) => {
  const controller = new AbortController();
  const data: IParticipant = await (
    await $authHost.get("api/participant/" + id).finally(() => {
      controller.abort();
    })
  ).data;
  localStorage.setItem("token", data.token);
  return data;
};
export const createParticipant = async (participant: any) => {
  const controller = new AbortController();
  const { data } = await $authHost
    .post("api/participant/", participant)
    .finally(() => {
      controller.abort();
    });
  localStorage.setItem("token", data.token);
};
export const getParticipantFree = async () => {
  const controller = new AbortController();
  const data: IParticipants = await (
    await $authHost.get("api/participant/free").finally(() => {
      controller.abort();
    })
  ).data;
  localStorage.setItem("token", data.token);
  return data.rows;
};
export const deleteParticipant = async (id: any) => {
  const controller = new AbortController();
  const { data } = await $authHost
    .post("api/participant/delete/", id)
    .finally(() => {
      controller.abort();
    });
  localStorage.setItem("token", data.token);
};
