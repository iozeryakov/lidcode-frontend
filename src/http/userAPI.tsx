import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";
interface IUser {
  login: string;
  id: number;
}
export const registration = async (login: string, password: string) => {
  const { data } = await $host.post("api/user/registration", {
    login,
    password,
  });
  localStorage.setItem("token", data.token);
  const user: IUser = jwt_decode(data.token);
  return user;
};

export const login = async (login: string, password: string) => {
  const { data } = await $host.post("api/user/login", { login, password });
  localStorage.setItem("token", data.token);
  const user: IUser = jwt_decode(data.token);
  return user;
};

export const check = async () => {
  const { data } = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  const user: IUser = jwt_decode(data.token);
  return user;
};
