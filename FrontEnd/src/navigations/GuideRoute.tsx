import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const GuideRoute = () => {
  const { userId, userType } = useSelector((state: any) => state.userInfo);

  if (!userId) {
    alert("로그인이 필요한 기능입니다.");
    return <Navigate to="/login" />;
  } else if (userType !== "GUIDE") {
    alert("권한이 없습니다.");
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default GuideRoute;
