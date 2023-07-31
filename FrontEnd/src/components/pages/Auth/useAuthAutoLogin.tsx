import { useEffect } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import {
  changeAccessToken,
  changeRefreshToken,
} from "../../../store/reducers/UserInfoReducer";

const useAuthAutoLogin = () => {
  const { accessToken } = useSelector((state: any) => state.userInfo);
  const dispatch = useDispatch();

  // 페이지가 로드될 때 실행되는 훅
  useEffect(() => {
    if (accessToken) {
      // 서버로 access token을 헤더에 담아 요청하여 유효성을 검사하고 새로운 access token과 refresh token을 받아옴
      validateToken(accessToken);
    } else {
      // 로그인되지 않은 상태이므로 메인페이지로 이동
      console.log("로그인되지 않은 상태입니다.");
      window.location.href = "http://localhost:5173/";
    }
  }, []);

  const validateToken = async (accessToken: string) => {
    try {
      const response = await axios.get("http://52.79.93.203/refresh", {
        headers: {
          Authorization: `${accessToken}`,
        },
      });
      console.log(response);

      const newAccessToken = response.headers["access_token"];
      dispatch(changeAccessToken(newAccessToken));

      // refreshToken 갱신
      const newRefreshToken = response.headers["refresh_token"];
      if (newRefreshToken) {
        dispatch(changeRefreshToken(newRefreshToken));
      }
    } catch (error) {
      // 서버로부터 새로운 access token과 refresh token을 받아옴
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 401
      ) {
        const newAccessToken = error.response.headers["access_token"];
        const newRefreshToken = error.response.headers["refresh_token"];
        dispatch(changeAccessToken(newAccessToken));

        // refreshToken 갱신
        if (newRefreshToken) {
          dispatch(changeRefreshToken(newRefreshToken));
        }
      } else {
        // 서버로부터 refresh token이 재발급되지 않았을 때
        // 또는 다른 오류가 발생했을 때 처리
        // 로그인되지 않은 상태이므로 메인페이지로 이동
        window.location.href = "http://localhost:5173/";
      }
    }
  };

  return null;
};

export default useAuthAutoLogin;
