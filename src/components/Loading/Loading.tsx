import { FC } from "react";
import "./Loading.css";

export const Loading: FC = () => {
  return (
    <div className="loading_wrapper">
      <img className="loading" src="/img/loading.png" alt="Загрузка" />
    </div>
  );
};
