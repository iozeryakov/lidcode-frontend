import React, { FC, useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Context } from ".";
import { AppRouter } from "./components/AppRouter";

import { observer } from "mobx-react-lite";
import { check } from "./http/userAPI";
import { Loading } from "./components/Loading/Loading";

export const App: FC = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    check()
      .then((data) => {
        user.setUser(data);
        user.setIsAuth(true);
      })
      .catch(() => user.setIsAuth(false))
      .finally(() => setLoading(false));
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
});
