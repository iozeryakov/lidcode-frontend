import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { IContent } from "../../types/IContent";
import "./AdminContent.css";

interface IProps {
  info: IContent;
  changeInfo: (id: number, value: boolean) => void;
}

export const AdminContent: FC<IProps> = ({ info, changeInfo }: IProps) => {
  const { pathname } = useLocation();
  return (
    <div className="admincontent">
      <div
        className="checkbox"
        onClick={() => changeInfo(info.id, !info.checked)}
      >
        <input
          type="checkbox"
          checked={info.checked}
          onChange={(e) => {
            changeInfo(info.id, e.target.checked);
          }}
          value={info.id}
        />
      </div>
      <Link to={pathname + "/" + info.id} className="content_info">
        <label className="label">{info.name}</label>
        <label className="label">{info.info}</label>
      </Link>
    </div>
  );
};
