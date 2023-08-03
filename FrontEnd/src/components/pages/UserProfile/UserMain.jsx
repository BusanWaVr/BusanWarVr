import React from "react";
import { useNavigate } from "react-router-dom";
import UserData from "../../blocks/UserData";



function UserMain() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleClick = () => {
    navigate("/update");
  };

  return (
    <div>
      <h1>유저 마이페이지 메인</h1>
      <UserData />
      <button onClick={handleClick}>내 정보 수정</button>
    </div>
  );
}

export default UserMain;
