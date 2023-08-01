import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const { userId } = useSelector((state: any) => state.userInfo);

  if (!userId) {
    alert("로그인이 필요한 기능입니다.");
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PublicRoute;
