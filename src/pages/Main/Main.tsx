import { FC, useEffect, useRef, useState } from "react";
import { Card } from "../../components/Card/Card";
import { useScroll } from "../../hooks/useScroll";
import { getEventOpen } from "../../http/eventAPI";
import { MainLayout } from "../../layouts/MainLayout/MainLayout";
import { IEvent } from "../../types/IEvent";
import "./Main.css";
export const Main: FC = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(1);
  const [data, setData] = useState<IEvent[]>([]);
  const [dateNow, setdateNow] = useState<Date>(new Date());
  const ref = useRef(null);
  useScroll(ref, () => {
    setPage((prevState) => prevState + 1);
  });
  const getData = async (page: number) => {
    const data = await getEventOpen(page);
    setMaxPage(Math.ceil(data.count / 10));
    setdateNow(data.dateNow);
    data.rows.map((i) => setData((prev) => [...prev, i]));
    setLoading(false);
  };
  useEffect(() => {
    if (page > 0 && page <= maxPage) getData(page);
  }, [page]);
  return (
    <MainLayout loading={loading}>
      <div className="main-wrapper">
        <div className="main-content">
          <h1 className="main-title">
            {maxPage > 0 ? "Соревнования" : "Нет открытых соревнований"}
          </h1>
          {data.map((i) => (
            <Card key={i.id} data={i} dateNow={dateNow} />
          ))}
        </div>
        <div className="useScroll" ref={ref}></div>
      </div>
    </MainLayout>
  );
};
