import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../..";
import { IContent } from "../../types/IContent";
import { IData, IDatas } from "../../types/IData";
import { AdminContent } from "../AdminContent/AdminContent";
import "./AdminContentAll.css";

interface Iprop {
  name: string;
  get: (page: number) => Promise<IDatas>;
  getInfo: (data: IData, dateNow?: Date) => string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  delette: (id: any) => Promise<void>;
}

export const AdminContentAll: FC<Iprop> = ({
  name,
  delette,
  getInfo,
  setLoading,
  get,
}: Iprop) => {
  const navigate = useNavigate();
  const { modal, user } = useContext(Context);
  const [checkboxs, setCheckboxs] = useState<IContent[]>([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const getData = async (page: number) => {
    const data = await get(page).catch((e) => {
      if (e.response.data.message === "Не авторизован") {
        modal.setIsVisible(true, "Ошибка, авторизуйтесь", true);
        user.setIsAuth(false);
        user.setUser(null);
      } else {
        modal.setIsVisible(true, "Ошибка", true);
      }
    });
    setCheckboxs([]);
    if (data) {
      setMaxPage(data.count / 10);
      for (const i of data.rows) {
        const info = getInfo(i, data.dateNow);
        addCheckboxs(i.name, Number(i.id), info);
      }
    }

    setIsDelete(false);
    setLoading(false);
  };
  useEffect(() => {
    if (selectAll) {
      setCheckboxs((prev) => prev.map((i) => ({ ...i, checked: selectAll })));
    } else {
      if (checkboxs.filter((i) => i.checked).length === checkboxs.length) {
        setCheckboxs((prev) => prev.map((i) => ({ ...i, checked: selectAll })));
      }
    }
  }, [selectAll]);
  useEffect(() => {
    if (
      checkboxs.filter((i) => i.checked).length === checkboxs.length &&
      checkboxs.length !== 0
    ) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [checkboxs]);
  useEffect(() => {
    setLoading(true);
    getData(page);
  }, [page]);
  const addCheckboxs = (name: string, id: number, info: string) => {
    setCheckboxs((prev) => [
      ...prev,
      {
        checked: false,
        name: name,
        id: id,
        info: info,
      },
    ]);
  };
  const changeInfo = (id: number, value: boolean) => {
    setCheckboxs((prev) =>
      prev.map((i) => (i.id === id ? { ...i, checked: value } : i))
    );
  };
  const deleteInfo = async () => {
    setLoading(true);
    let Auth = true;
    let countDelete = 0;
    for (const i of checkboxs) {
      let flag = false;
      if (i.checked) {
        let del = false;
        await delette({ id: i.id })
          .then(() => {
            del = true;
          })
          .catch((e) => {
            if (e.response.data.message === "Не авторизован") {
              modal.setIsVisible(true, "Ошибка удаления, авторизуйтесь", true);
              user.setIsAuth(false);
              user.setUser(null);
              flag = true;
            }
          });
        if (del) countDelete++;
      }
      if (flag) {
        Auth = false;
        break;
      }
    }
    if (countDelete === checkboxs.filter((e) => e.checked).length) {
      modal.setIsVisible(true, "Успешно удалено", false);
    } else {
      Auth &&
        modal.setIsVisible(
          true,
          "Ошибка удаления, удалено " +
            countDelete +
            "/" +
            checkboxs.filter((e) => e.checked).length,
          true
        );
    }
    if (page === 1) {
      Auth && getData(page);
    } else {
      Auth && setPage(1);
    }
  };
  return (
    <>
      <h1 className="adminmain-title">{name}</h1>
      <div className="adminmain-content shadow">
        {isDelete ? (
          <>
            <div className="dialog">
              <label className="label">Вы уверены что хотите удалить? </label>
            </div>

            <div className="admincontent_wrapper ">
              <form className="admincontent">
                <div className="wrapper_buttons">
                  <input
                    type="button"
                    className="button_del"
                    value="Отменить"
                    onClick={() => {
                      setIsDelete(false);
                    }}
                  />
                  <input
                    type="button"
                    className="button_del"
                    value="Подтвердить"
                    onClick={() => {
                      deleteInfo();
                    }}
                  />
                </div>
              </form>
            </div>
          </>
        ) : (
          <>
            <div className="admincontent_wrapper panel">
              <form className="admincontent">
                <label className="content_label label">Выделить все:</label>
                <div
                  className="checkbox"
                  onClick={() => setSelectAll((prev) => !prev)}
                >
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={(e) => setSelectAll(e.target.checked)}
                  />
                </div>
                <div className="wrapper_buttons">
                  <div></div>
                  <div>
                    <input
                      type="button"
                      className="button_del"
                      value="Добавить"
                      onClick={() => {
                        navigate("new");
                      }}
                    />
                    <input
                      type="button"
                      className="button_del"
                      value="Удалить"
                      onClick={() => {
                        if (checkboxs.filter((i) => i.checked).length !== 0) {
                          setIsDelete(true);
                        } else {
                          modal.setIsVisible(
                            true,
                            "Не выбрано ни отдного элемента",
                            true
                          );
                        }
                      }}
                    />
                  </div>
                </div>
              </form>
            </div>
            <form className="admincontent_wrapper">
              {checkboxs.length === 0 ? (
                <div className="admincontent">
                  <div className="content_info cursorDefault">
                    <label className="label">Нет записей</label>
                  </div>
                </div>
              ) : (
                checkboxs.map((i: IContent) => (
                  <AdminContent key={i.id} info={i} changeInfo={changeInfo} />
                ))
              )}
            </form>
            <div className="BackNext">
              {page > 1 ? (
                <label
                  className="label BackNext_label"
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  Назад
                </label>
              ) : (
                <></>
              )}
              {page < maxPage ? (
                <label
                  className="label BackNext_label"
                  onClick={() => {
                    setPage((prev) => prev + 1);
                  }}
                >
                  Вперед
                </label>
              ) : (
                <div></div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};
