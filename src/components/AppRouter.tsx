import React, { FC, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { AdminLogin } from "../pages/Admin/AdminLogin/AdminLogin";
import { Error404 } from "../pages/Error404/Error404";

export const AppRouter: FC = observer(() => {
  const { user } = useContext(Context);

  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={Component} />
      ))}
      {authRoutes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={user.isAuth ? Component : <AdminLogin />}
        />
      ))}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
});
