import { IMaterial, IMaterials } from "../types/IMaterial";
import { $authHost } from "./index";
export const getMaterialAll = async (page: number) => {
  const controller = new AbortController();
  const data: IMaterials = await (
    await $authHost.get("api/material/?page=" + page).finally(() => {
      controller.abort();
    })
  ).data;
  localStorage.setItem("token", data.token);
  return data;
};
export const createMaterial = async (materi: any) => {
  const controller = new AbortController();
  const { data } = await $authHost.post("api/material/", materi).finally(() => {
    controller.abort();
  });
  localStorage.setItem("token", data.token);
};
export const updateMaterial = async (materi: any) => {
  const controller = new AbortController();
  const { data } = await $authHost
    .post("api/material/update/", materi)
    .finally(() => {
      controller.abort();
    });
  localStorage.setItem("token", data.token);
};
export const deleteMaterial = async (id: any) => {
  const controller = new AbortController();
  const { data } = await $authHost
    .post("api/material/delete/", id)
    .finally(() => {
      controller.abort();
    });
  localStorage.setItem("token", data.token);
};
export const getMaterial = async (id: string) => {
  const controller = new AbortController();
  const data: IMaterial = await (
    await $authHost.get("api/material/" + id).finally(() => {
      controller.abort();
    })
  ).data;
  localStorage.setItem("token", data.token);
  return data;
};
export const getMaterialFree = async (id: string) => {
  const controller = new AbortController();
  const data: IMaterials = await (
    await $authHost.get("api/material/free/?id=" + id).finally(() => {
      controller.abort();
    })
  ).data;
  localStorage.setItem("token", data.token);
  return data;
};
