import { FC, useEffect, useState } from "react";
import { MainLayout } from "../../layouts/MainLayout/MainLayout";
import "./Error404.css";

export const Error404: FC = () => {
  const [numberError, setNumberError] = useState(0);
  useEffect(() => {
    setTimeout(function () {
      if (numberError < 390) setNumberError((prev) => prev + 10);
      else if (numberError < 404) setNumberError((prev) => prev + 1);
    }, 80);
  }, [numberError]);

  return (
    <MainLayout loading={false}>
      <div className="main-wrapper">
        <div>{numberError}</div>
        <div>Вы попали на секретную страницу, которой не существует. </div>
      </div>
    </MainLayout>
  );
};
