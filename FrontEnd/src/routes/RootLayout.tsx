import { Outlet } from "react-router-dom";

import Header from "../components/common/Header";

function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
export default RootLayout;
