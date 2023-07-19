import { Outlet } from "react-router-dom";

function Test() {
  return (
    <>
      <Outlet />
      <h1>Test 페이지입니다.</h1>
    </>
  );
}

export default Test;