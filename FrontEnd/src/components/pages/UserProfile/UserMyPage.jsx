import React from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "./UserNavbar";

function UserMyPage() {
  return (
    <div>
      <UserNavbar />
      <Outlet />
    </div>
  );
}

export default UserMyPage;
