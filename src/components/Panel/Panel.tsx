import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface IPanel {
  path: string;
  add: () => void;
  isAdd: boolean;
  error: boolean;
}
export const Panel: FC<IPanel> = ({ path, add, isAdd, error }: IPanel) => {
  const navigate = useNavigate();
  return (
    <div className="admincontent_wrapper panel">
      <form className="admincontent">
        <div className="wrapper_buttons">
          <input
            type="button"
            className="button_del"
            value="Назад"
            onClick={() => {
              navigate("../" + path);
            }}
          />
          {error ? (
            <label className="label mar">ОШИБКА</label>
          ) : (
            <input
              type="button"
              className="button_del"
              value={isAdd ? "Добавить" : "Сохранить"}
              onClick={() => {
                add();
              }}
            />
          )}
        </div>
      </form>
    </div>
  );
};
