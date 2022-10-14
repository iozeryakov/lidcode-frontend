import { FC, useEffect } from "react";
import { useInput } from "../../hooks/useInput";
import { IInputs } from "../../types/IInputs";
import "./FormReg.css";

interface IProps {
  contact: boolean;
  index: number;
  contactId: number;
  coachId: number;
  coach: boolean;
  changeInfo: (key: string, value: boolean | string, number: number) => void;
  remove: (number: number) => void;
  i: IInputs;
}

export const FormReg: FC<IProps> = ({
  contact,
  index,
  contactId,
  changeInfo,
  remove,
  coachId,
  coach,
  i,
}: IProps) => {
  const name = useInput(i.name, {
    minLength: 3,
    maxLength: 50,
    isEmpty: true,
  });
  const emailAdress = useInput(i.emailAdress, {
    minLength: 3,
    maxLength: 50,
    isEmpty: true,
    email: true,
  });
  const phoneNumbers = useInput(i.phoneNumbers, {
    minLength: 3,
    maxLength: 50,
    isEmpty: true,
    phoneNumbers: true,
  });
  const organization = useInput(i.organization, {
    minLength: 3,
    maxLength: 50,
    isEmpty: true,
  });
  const universityFaculty = useInput(i.universityFaculty, {
    minLength: 3,
    maxLength: 50,
    isEmpty: true,
  });
  const universityCourse = useInput(i.universityCourse, {
    minLength: 1,
    maxLength: 50,
    isEmpty: true,
  });
  useEffect(() => {
    if (
      name.inputValid &&
      emailAdress.inputValid &&
      phoneNumbers.inputValid &&
      organization.inputValid &&
      universityFaculty.inputValid &&
      universityCourse.inputValid
    ) {
      changeInfo("valid", true, index);
    } else {
      changeInfo("valid", false, index);
    }
  }, [
    name.inputValid,
    emailAdress.inputValid,
    phoneNumbers.inputValid,
    organization.inputValid,
    universityFaculty.inputValid,
    universityCourse.inputValid,
    index,
  ]);
  return (
    <div className="wrapper_party">
      <div className="wrapper_rem">
        <h2 className="checkbox_h2">Участник {index + 1}:</h2>
        {index !== 0 && (
          <div className="remove" onClick={() => remove(index)}></div>
        )}
      </div>
      {!contact || index === contactId ? (
        <div className="checkbox_item">
          <input
            type="checkbox"
            checked={i.isContactFace}
            onChange={(e) => {
              changeInfo("isContactFace", e.target.checked, index);
            }}
          />
          <p className="checkbox_p">Контактное лицо</p>
          {!contact && <div className="red">*</div>}
        </div>
      ) : (
        <></>
      )}
      {!coach || index === coachId ? (
        <div className="checkbox_item">
          <input
            type="checkbox"
            checked={i.isCoach}
            onChange={(e) => changeInfo("isCoach", e.target.checked, index)}
          />
          <p className="checkbox_p">Тренер</p>
          {!coach && <div className="red">*</div>}
        </div>
      ) : (
        <></>
      )}

      <div className="reg_form__item item_margin">
        <img className="img_input" src="/img/name.png" alt="ФИО" />
        <input
          className="input_text"
          type="text"
          value={name.value}
          onChange={(e) => {
            changeInfo("name", e.target.value, index);
            name.onChange(e);
          }}
          placeholder="ФИО*"
        />
        {!name.inputValid && <div className="red">*</div>}
      </div>
      <div className="reg_form__item item_margin">
        <img className="img_input" src="/img/email.png" alt="Email" />
        <input
          className="input_text"
          type="text"
          value={emailAdress.value}
          onChange={(e) => {
            changeInfo("emailAdress", e.target.value, index);
            emailAdress.onChange(e);
          }}
          placeholder="Email*"
        />
        {!emailAdress.inputValid && <div className="red">*</div>}
      </div>
      <div className="reg_form__item item_margin">
        <img className="img_input" src="/img/telephone.png" alt="Телефон" />
        <input
          className="input_text"
          type="text"
          placeholder="Телефон*"
          value={phoneNumbers.value}
          onChange={(e) => {
            changeInfo("phoneNumbers", e.target.value, index);
            phoneNumbers.onChange(e);
          }}
        />
        {!phoneNumbers.inputValid && <div className="red">*</div>}
      </div>
      <div className="reg_form__item item_margin">
        <img
          className="img_input"
          src="/img/organization.png"
          alt="Организация"
        />
        <input
          className="input_text"
          type="text"
          placeholder="Организация*"
          value={organization.value}
          onChange={(e) => {
            changeInfo("organization", e.target.value, index);
            organization.onChange(e);
          }}
        />
        {!organization.inputValid && <div className="red">*</div>}
      </div>
      <div className="reg_form__item item_margin">
        <img className="img_input" src="/img/faculty.png" alt="Факультет" />
        <input
          className="input_text"
          type="text"
          placeholder="Факультет"
          value={universityFaculty.value}
          onChange={(e) => {
            universityFaculty.onChange(e);
            changeInfo("universityFaculty", e.target.value, index);
          }}
        />
        {!universityFaculty.inputValid && <div className="red">*</div>}
      </div>
      <div className="reg_form__item item_margin">
        <img className="img_input" src="/img/course.png" alt="Курс" />
        <input
          className="input_text"
          type="text"
          value={universityCourse.value}
          onChange={(e) => {
            universityCourse.onChange(e);
            changeInfo("universityCourse", e.target.value, index);
          }}
          placeholder="Курс"
        />
        {!universityCourse.inputValid && <div className="red">*</div>}
      </div>
    </div>
  );
};
