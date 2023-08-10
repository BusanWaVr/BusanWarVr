import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import Header from "../../blocks/Header.tsx";
import { useSelector } from "react-redux";

import { NextUIProvider } from "@nextui-org/react";

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
      <NextUIProvider>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Outlet />
      </NextUIProvider>
    </>
  );
}
export default RootLayout;
