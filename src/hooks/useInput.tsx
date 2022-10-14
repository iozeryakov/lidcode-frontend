import { useState } from "react";
import { IValidations } from "../types/IValidations";
import { useValidation } from "./useValidation";

export function useInput(initialValue: string, validations: IValidations) {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);
  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  const onBlur = () => {
    setDirty(true);
  };
  return { value, onChange, onBlur, isDirty, ...valid, setValue };
}
