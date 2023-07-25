import { useEffect } from "react";
import axios from "axios";

const useAuthAutoLogin = () => {
  // 페이지가 로드될 때 실행되는 훅
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
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
      const response = await axios.get("http://13.209.65.4/refresh", {
        headers: {
          Authorization: `${accessToken}`,
        },
      });
      console.log(response);

      const newAccessToken = response.headers["access_token"];
      localStorage.setItem("accessToken", newAccessToken);

      // refreshToken 갱신
      const newRefreshToken = response.headers["refresh_token"];
      if (newRefreshToken) {
        localStorage.setItem("refreshToken", newRefreshToken);
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
        localStorage.setItem("accessToken", newAccessToken);

        // refreshToken 갱신
        if (newRefreshToken) {
          localStorage.setItem("refreshToken", newRefreshToken);
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
