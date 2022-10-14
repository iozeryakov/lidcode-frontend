import { FC } from "react";
import "./Confirmation.css";

interface IProps {
  addTeam: () => void;
  setIsOpenCod: React.Dispatch<React.SetStateAction<boolean>>;
  cod: any;
  email: string;
}
export const Confirmation: FC<IProps> = ({
  addTeam,
  setIsOpenCod,
  cod,
  email,
}: IProps) => {
  const goodEmail = email.split("@");
  return (
    <>
      <label
        className="label mar"
        onClick={() => {
          setIsOpenCod(false);
        }}
      >
        Назад
      </label>
      <label className="label mar text-center">
        {"Введите код подтверждения, отправленный на email (" +
          goodEmail[0].substring(0, 2) +
          "..." +
          goodEmail[0].substring(goodEmail[0].length - 2, goodEmail[0].length) +
          "@" +
          goodEmail[1] +
          "):"}
      </label>
      <div className="reg_form__item">
        <img className="img_input" src="/img/cod.png" alt="ФИО" />
        <input
          className="input_text"
          type="text"
          placeholder="код*"
          value={cod.value}
          onBlur={() => cod.onBlur()}
          onChange={(e) => cod.onChange(e)}
        />
        {cod.isDirty && !cod.inputValid && <div className="red">*</div>}
      </div>
      <input
        type="button"
        value="Подтвердить"
        className="button"
        onClick={() => {
          addTeam();
        }}
      />
    </>
  );
};
