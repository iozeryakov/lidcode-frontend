import { IEvents, IEvent } from "../types/IEvent";
import { $authHost, $host } from "./index";
export const createEvent = async (event: any) => {
  const controller = new AbortController();
  const { data } = await $authHost.post("api/event/", event).finally(() => {
    controller.abort();
  });
  localStorage.setItem("token", data.token);
};
export const getEventAll = async (page: number) => {
  const controller = new AbortController();
  const data: IEvents = await (
    await $authHost.get("api/event/?page=" + page).finally(() => {
      controller.abort();
    })
  ).data;
  localStorage.setItem("token", data.token);
  return data;
};
export const getEventOpen = async (page: number) => {
  const controller = new AbortController();
  const data: IEvents = await (
    await $host.get("api/event/open/?page=" + page).finally(() => {
      controller.abort();
    })
  ).data;
  return data;
};
export const updateEvent = async (event: any) => {
  const controller = new AbortController();
  const { data } = await $authHost
    .post("api/event/update/", event)
    .finally(() => {
      controller.abort();
    });
  localStorage.setItem("token", data.token);
};

export const getEventOne = async (id: string) => {
  const controller = new AbortController();
  const data: IEvent = await (
    await $host.get("api/event/" + id).finally(() => {
      controller.abort();
    })
  ).data;
  return data;
};
export const deleteEvent = async (id: any) => {
  const controller = new AbortController();
  const { data } = await $authHost.post("api/event/delete/", id).finally(() => {
    controller.abort();
  });
  localStorage.setItem("token", data.token);
};
