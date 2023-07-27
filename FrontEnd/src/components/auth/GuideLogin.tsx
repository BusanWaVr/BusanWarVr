import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
// GuideLogin.js
import styled from "styled-components";

const GuideLoginWrapper = styled.div`
  /* Add your styling for the guide login form wrapper */
`;

const LoginInputLabel = styled.label`
  width: 100%;
  text-align: left;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 5px;
`;

const LoginInput = styled.input`
  display: block;
  width: 100%;
  height: 45px;
  border-radius: 15px;
  padding: 0 10px;
  margin-bottom: 35px;
  font-size: 12px;
  border: 1px solid #ccc;
`;

const LoginButton = styled.button`
  display: block;
  width: 100%;
  height: 45px;
  border-radius: 15px;
  background-color: #ff9090;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  &:hover {
    background-color: #ff7171;
  }
`;

function GuideLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // 가이드 로그인 요청을 서버에 보내고 JWT 토큰을 받아옴
      const response = await fetch("http://52.79.93.203/guide/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("가이드 로그인에 실패하였습니다.");
      }

      const JWT_Token = await response.json();
      const accessToken = JWT_Token.data.access_Token;
      const refreshToken = JWT_Token.data.refresh_Token;

      // 받아온 JWT 토큰들을 로컬 스토리지에 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // 가이드 로그인이 성공했음을 표시
      console.log("가이드 로그인 성공");

      navigate("/guide-dashboard"); // 성공시 Guide Dashboard 페이지로 이동
    } catch (error) {
      console.error("가이드 로그인 중 오류 발생:", error);
    }
  };

  return (
    <GuideLoginWrapper>
      <form action="" id="guideLoginForm" onSubmit={handleSubmit}>
        <div className="login-form__input-group">
          <LoginInputLabel htmlFor="email">이메일</LoginInputLabel>
          <LoginInput
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="이메일 주소 ex) guide@example.com"
            className="login-form__input-id"
          />
          <LoginInputLabel htmlFor="password">비밀번호</LoginInputLabel>
          <LoginInput
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="영문,숫자,특수문자(!,@,#,$,%) 2종류 포함 10자리 이상"
            className="login-form__input-pwd"
          />
        </div>
        <LoginButton type="submit" className="login-form__submit-btn">
          가이드 로그인
        </LoginButton>
      </form>
    </GuideLoginWrapper>
  );
}

export default GuideLogin;
