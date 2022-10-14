import axios from "axios";
import { API_URL } from "../utils/consts";

export const $host = axios.create({
  baseURL: API_URL,
});
export const $authHost = axios.create({
  baseURL: API_URL,
});

export const authInterceptor = (config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);
