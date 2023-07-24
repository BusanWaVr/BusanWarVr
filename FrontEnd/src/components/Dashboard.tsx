// src/components/Dashboard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 로그아웃 버튼을 클릭하면 로컬 스토리지에서 JWT 토큰을 삭제
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    console.log("Logged out");
    navigate("/login");
  };

  return (
    <div>
      <h1>로그아웃화면</h1>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default Dashboard;
