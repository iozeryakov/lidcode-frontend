import { useEffect, useState } from "react";
import { IValidations } from "../types/IValidations";

export function useValidation(value: string, validations: IValidations) {
  const [isEmpty, setIsEmpty] = useState(true);
  const [minLength, setMinLength] = useState(false);
  const [maxLength, setMaxLength] = useState(false);
  const [email, setEmail] = useState(false);
  const [link, setLink] = useState(false);
  const [inputValid, setInputValid] = useState(false);
  const [phoneNumbers, setPhoneNumbers] = useState(false);
  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "minLength":
          if (validations[validation]) {
            value.length < validations[validation]
              ? setMinLength(true)
              : setMinLength(false);
          }
          break;
        case "isEmpty":
          value ? setIsEmpty(false) : setIsEmpty(true);
          break;
        case "maxLength":
          if (validations[validation]) {
            value.length > validations[validation]
              ? setMaxLength(true)
              : setMaxLength(false);
          }
          break;
        case "email":
          value.match(
            "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
          )
            ? setEmail(false)
            : setEmail(true);
          break;
        case "phoneNumbers":
          value.match(
            /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})/
          )
            ? setPhoneNumbers(false)
            : setPhoneNumbers(true);
          break;
        case "link":
          const validUrl = require("valid-url");
          validUrl.isUri(value) ? setLink(false) : setLink(true);
          break;
      }
    }
  }, [value, validations]);
  useEffect(() => {
    if (isEmpty || minLength || maxLength || email || link || phoneNumbers) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, maxLength, minLength, email, link, phoneNumbers]);
  return {
    isEmpty,
    maxLength,
    minLength,
    inputValid,
    email,
    link,
    phoneNumbers,
  };
}
