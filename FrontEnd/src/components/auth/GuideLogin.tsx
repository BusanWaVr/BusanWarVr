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

const LoginButton = styled.span`
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
  return (
    <GuideLoginWrapper>
      <form action="" id="loginForm">
        <div className="login-form__input-group">
          <LoginInputLabel htmlFor="email">이메일</LoginInputLabel>
          <LoginInput
            type="text"
            id="email"
            name="email"
            placeholder="이메일 주소 ex) busanvr@busanvr.co.kr"
            className="login-form__input-id"
          />
          <LoginInputLabel htmlFor="password">비밀번호</LoginInputLabel>
          <LoginInput
            type="text"
            id="password"
            name="password"
            placeholder="영문,숫자,특수문자(!,@,#,$,%) 2종류 포함 10자리 이상"
            className="login-form__input-pwd"
          />
        </div>
        <LoginButton className="login-form__submit-btn">
          가이드 로그인
        </LoginButton>
      </form>
    </GuideLoginWrapper>
  );
}

export default GuideLogin;
