import React from "react";
import { Route, Routes } from "react-router-dom";
import UserMain from "./UserMain";
import UserTourBoard from "./UserTourBoard";
import UserWishBoard from "./UserWishBoard";
import UserFollowingBoard from "./UserFollowingBoard";

function UserMyPage() {
  return (
    <Routes>
      <Route path="/main" element={<UserMain />} />
      <Route path="/tour" element={<UserTourBoard />} />
      <Route path="/wish" element={<UserWishBoard />} />
      <Route path="/following" element={<UserFollowingBoard />} />
    </Routes>
  );
}

export default UserMyPage;
