import { IOrgSpon, IOrgSpons } from "../types/IOrgSpon";
import { $authHost } from "./index";
export const getSponsorAll = async (page: number) => {
  const controller = new AbortController();
  const data: IOrgSpons = await (
    await $authHost.get("api/sponsor/?page=" + page).finally(() => {
      controller.abort();
    })
  ).data;
  localStorage.setItem("token", data.token);
  return data;
};
export const getSponsor = async (id: string) => {
  const controller = new AbortController();
  const data: IOrgSpon = await (
    await $authHost.get("api/sponsor/" + id).finally(() => {
      controller.abort();
    })
  ).data;
  localStorage.setItem("token", data.token);
  return data;
};
export const getSponsorFree = async (id: string) => {
  const controller = new AbortController();
  const data: IOrgSpons = await (
    await $authHost.get("api/sponsor/free/?id=" + id).finally(() => {
      controller.abort();
    })
  ).data;
  localStorage.setItem("token", data.token);
  return data;
};
export const updateSponsor = async (sponsor: any) => {
  const controller = new AbortController();
  const { data } = await $authHost
    .post("api/sponsor/update", sponsor)
    .finally(() => {
      controller.abort();
    });
  localStorage.setItem("token", data.token);
};
export const createSponsor = async (sponsor: any) => {
  const controller = new AbortController();
  const { data } = await $authHost.post("api/sponsor/", sponsor).finally(() => {
    controller.abort();
  });
  localStorage.setItem("token", data.token);
};
export const deleteSponsor = async (id: any) => {
  const controller = new AbortController();
  const { data } = await $authHost
    .post("api/sponsor/delete/", id)
    .finally(() => {
      controller.abort();
    });
  localStorage.setItem("token", data.token);
};
