import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const { userId } = useSelector((state: any) => state.userInfo);

  if (userId) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PublicRoute;
