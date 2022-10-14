import { FC, useState } from "react";
import { ISelect } from "../../types/ISelect";
import "./Selects.css";

interface IProps {
  name: string;
  sel: ISelect[];
  free: ISelect[];
  setSel: (value: React.SetStateAction<ISelect[]>) => void;
  setFree: (value: React.SetStateAction<ISelect[]>) => void;
  numberComands?: number;
  valid?: boolean;
}
export const Selects: FC<IProps> = ({
  name,
  sel,
  free,
  setSel,
  setFree,
  numberComands,
  valid,
}: IProps) => {
  const [EFree, setEFree] = useState<HTMLCollectionOf<HTMLOptionElement>>();
  const [ESel, setESel] = useState<HTMLCollectionOf<HTMLOptionElement>>();
  const add = () => {
    if (EFree)
      for (let i = 0; i < EFree.length; i++) {
        const el = free.filter(({ id }) => id === Number(EFree[i].value))[0];
        setSel((prev) => [
          ...prev,
          {
            id: el.id,
            name: el.name,
            count: el.count,
            approvement: el.approvement,
          },
        ]);
        setFree((prev) =>
          prev.filter(({ id }) => id !== Number(EFree[i].value))
        );
      }
  };
  const addAll = () => {
    setSel((prev) => [...prev, ...free]);
    setFree([]);
  };
  const dellAll = () => {
    setFree((prev) => [...prev, ...sel]);
    setSel([]);
  };
  const dell = () => {
    if (ESel)
      for (let i = 0; i < ESel.length; i++) {
        const el = sel.filter(({ id }) => id === Number(ESel[i].value))[0];
        setFree((prev) => [
          ...prev,
          {
            id: el.id,
            name: el.name,
            count: el.count,
            approvement: el.approvement,
          },
        ]);
        setSel((prev) => prev.filter(({ id }) => id !== Number(ESel[i].value)));
      }
  };

  return (
    <div className="reg_admin__item">
      <div className="column">
        <label className="label mar">Свободные {name}:</label>
        <select
          className="selectml"
          onChange={(e) => {
            setEFree(e.target.selectedOptions);
          }}
          size={9}
          multiple
        >
          {free
            .sort((a, b) => {
              if (a.id < b.id) {
                return 1;
              }
              if (a.id > b.id) {
                return -1;
              }

              return 0;
            })
            .map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
        </select>
      </div>
      <div className="column ">
        <input
          type="button"
          className="button_del"
          value=">"
          onClick={() => {
            add();
          }}
        />
        <input
          type="button"
          className="button_del"
          value=">>"
          onClick={() => {
            addAll();
          }}
        />
        <input
          type="button"
          className="button_del"
          value="<<"
          onClick={() => {
            dellAll();
          }}
        />
        <input
          type="button"
          className="button_del"
          value="<"
          onClick={() => {
            dell();
          }}
        />
      </div>
      <div className="column">
        <label className="label mar">
          Выбранные {name} {numberComands && "(max" + numberComands + ")"}:
        </label>
        <select
          className={
            numberComands
              ? valid
                ? "selectml"
                : "selectml borderRed"
              : "selectml"
          }
          onChange={(e) => {
            setESel(e.target.selectedOptions);
          }}
          size={9}
          multiple
        >
          {sel
            .sort((a, b) => {
              if (a.id < b.id) {
                return 1;
              }
              if (a.id > b.id) {
                return -1;
              }
              return 0;
            })
            .map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};
