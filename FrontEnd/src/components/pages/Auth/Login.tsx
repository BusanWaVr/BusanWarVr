import { useState } from "react";
import GeneralLogin from "./GeneralLogin";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useI18n } from "../../../hooks/useI18n"

const LoginWrapper = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 60px 40px;
`;

const LoginMenu = styled.div`
  display: flex;
  height: 40px;
  border-bottom: solid 1px #ccc;
  margin-bottom: 30px;
`;

const LoginLink = styled.div`
  display: block;
  width: 100%;
  color: black;
  font-weight: 700;
`;

interface Props {
  setOnLoginModal: any;
  setIsLoggedIn: any;
}

function Login({ setOnLoginModal, setIsLoggedIn }: Props) {
  const t = useI18n()
  const [isGeneralLoginVisible, setIsGeneralLoginVisible] = useState(true);

  // 모달이 그대로 남아있어서.. 새로고침하면서 이동하게 해뒀음
  // 이부분 없애고 아래에 Link to="/signup" 하면 새로고침 없이 이동함
  const handleSignupLinkClick = () => {
    window.location.href = "/signup";
  };

  // guidesignup
  const handleGuideSignupLinkClick = () => {
    window.location.href = "/guidesignup";
  };

  return (
    <LoginWrapper className="login-form">
      <LoginMenu className="login-menu">
        <LoginLink>로그인</LoginLink>
      </LoginMenu>
      <div className="login-wrapper">
        <GeneralLogin
          setOnLoginModal={setOnLoginModal}
          setIsLoggedIn={setIsLoggedIn}
        />
        {/* 아직 회원이 아니신가요? 회원가입하러 가기 링크 */}
        <p>
        {t(`아직 회원이 아니신가요?`)} <br />
          <Link to="#" onClick={handleSignupLinkClick}>
          {t(`일반 회원가입`)}
          </Link>
          <br />
          <Link to="#" onClick={handleGuideSignupLinkClick}>
          {t(`가이드 회원가입`)}
          </Link>
        </p>
      </div>
    </LoginWrapper>
  );
}
export default Login;
