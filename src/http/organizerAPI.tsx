import { IOrgSpon, IOrgSpons } from "../types/IOrgSpon";
import { $authHost } from "./index";

export const getOrganizerAll = async (page: number) => {
  const controller = new AbortController();
  const data: IOrgSpons = await (
    await $authHost.get("api/organizer/?page=" + page).finally(() => {
      controller.abort();
    })
  ).data;
  localStorage.setItem("token", data.token);
  return data;
};
export const getOrganizer = async (id: string) => {
  const controller = new AbortController();
  const data: IOrgSpon = await (
    await $authHost.get("api/organizer/" + id).finally(() => {
      controller.abort();
    })
  ).data;
  localStorage.setItem("token", data.token);
  return data;
};
export const getOrganizerFree = async (id: string) => {
  const controller = new AbortController();
  const data: IOrgSpons = await (
    await $authHost.get("api/organizer/free/?id=" + id).finally(() => {
      controller.abort();
    })
  ).data;
  localStorage.setItem("token", data.token);
  return data;
};
export const createOrganizer = async (organizer: any) => {
  const controller = new AbortController();
  const { data } = await $authHost
    .post("api/organizer/", organizer)
    .finally(() => {
      controller.abort();
    });
  localStorage.setItem("token", data.token);
};
export const updateOrganizer = async (organizer: any) => {
  const controller = new AbortController();
  const { data } = await $authHost
    .post("api/organizer/update", organizer)
    .finally(() => {
      controller.abort();
    });
  localStorage.setItem("token", data.token);
};
export const deleteOrganizer = async (id: any) => {
  const controller = new AbortController();
  const { data } = await $authHost
    .post("api/organizer/delete/", id)
    .finally(() => {
      controller.abort();
    });
  localStorage.setItem("token", data.token);
};
