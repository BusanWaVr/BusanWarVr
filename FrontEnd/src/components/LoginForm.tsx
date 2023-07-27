import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // 로그인 요청을 서버에 보내고 JWT 토큰을 받아옴
      const response = await fetch("http://18.217.191.122:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error("Login failed.");
      }

      // 받아온 JWT 토큰들을 localStorage에 저장
      const JWT_Token = await response.json();
      const accessToken = JWT_Token.data.access_Token;
      const refreshToken = JWT_Token.data.refresh_Token;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      console.log(localStorage);

      // 로그인이 성공유무
      console.log("Login successful");

      navigate("/dashboard"); // 성공시 Dashboard 페이지로 이동
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      <h1>로그인 화면</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">이메일:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginForm;
