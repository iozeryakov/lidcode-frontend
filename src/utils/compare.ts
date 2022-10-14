import dateFormat from "dateformat";

export const compareDate = (
  dateNow: Date,
  dateRegister: Date,
  dateCloseRegister: Date,
  dateStart: Date,
  dateEnd: Date
) => {
  let ret = "Ожидание регистрации";

  if (
    new Date(dateFormat(dateNow, "yyyy-mm-dd'T'HH:MM:ss", true)) >=
    new Date(dateFormat(dateRegister, "yyyy-mm-dd'T'HH:MM"))
  ) {
    ret = "Регистрация открыта";
    if (
      new Date(dateFormat(dateNow, "yyyy-mm-dd'T'HH:MM:ss", true)) >
      new Date(dateFormat(dateCloseRegister, "yyyy-mm-dd'T'HH:MM"))
    ) {
      ret = "Регистрация закрыта";
      if (
        new Date(dateFormat(dateNow, "yyyy-mm-dd'T'HH:MM:ss", true)) >=
        new Date(dateFormat(dateStart, "yyyy-mm-dd'T'HH:MM"))
      ) {
        ret = "Соревнование открыто";
        if (
          new Date(dateFormat(dateNow, "yyyy-mm-dd'T'HH:MM:ss", true)) >=
          new Date(dateFormat(dateEnd, "yyyy-mm-dd'T'HH:MM"))
        ) {
          ret = "Соревнование закрыто";
        }
      }
    }
  }
  return ret;
};
