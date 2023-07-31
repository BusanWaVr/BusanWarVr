import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import Header from "../../blocks/Header.tsx";
import { useSelector } from "react-redux";

function RootLayout() {
  const { accessToken, refreshToken } = useSelector(
    (state: any) => state.userInfo
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (accessToken && refreshToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Outlet />
    </>
  );
}
export default RootLayout;
