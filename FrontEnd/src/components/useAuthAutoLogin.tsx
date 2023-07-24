import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

interface User {
  userId: string;
  refreshToken: string;
  type: string;
}

const useAuthAutoLogin = () => {
  const [user, setUser] = useState<User | null>(null);

  // 페이지가 로드될 때마다 실행되는 훅
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken) {
      // 만료 시간 확인
      const expirationDate = localStorage.getItem("accessTokenExpiration");
      if (expirationDate && new Date(expirationDate) > new Date()) {
        // 만료되지 않은 access token이 있는 경우
        setUser({ userId: "", refreshToken: "", type: "" }); // 실제 사용자 정보로 대체
      } else {
        // access token이 만료된 경우, refresh token을 사용하여 새로운 access token을 받아옴
        refreshAccessToken(refreshToken);
      }
    } else {
      // 로그인되지 않은 상태이므로 메인페이지로 이동
      window.location.href = "http://localhost:5173/";
    }
  }, []);

  const refreshAccessToken = async (refreshToken: string | null) => {
    if (!refreshToken) {
      // 로그인되지 않은 상태이므로 메인페이지로 이동
      window.location.href = "http://localhost:5173/";
      return;
    }

    try {
      const response: AxiosResponse<{ accessToken: string }> = await axios.post(
        "http://localhost:5173/refresh",
        { refreshToken }
      );
      const newAccessToken = response.data.accessToken;
      const expirationDate = new Date(new Date().getTime() + 3600 * 1000); // 1시간 뒤 만료
      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem(
        "accessTokenExpiration",
        expirationDate.toISOString()
      );
      setUser({ userId: "", refreshToken: "", type: "" }); // 실제 사용자 정보로 대체
    } catch (error) {
      // 서버로부터 refresh token이 재발급되지 않았을 때
      const errorResponse = error as AxiosResponse; // 특정 타입으로 캐스팅
      if (errorResponse && errorResponse.status === 401) {
        // 로그인되지 않은 상태이므로 메인페이지로 이동
        window.location.href = "http://localhost:5173/";
      }
    }
  };
  console.log(localStorage.accessToken);
  console.log(localStorage.refreshToken);
  console.log("자동로그인성공");
  return user;
};

export default useAuthAutoLogin;
