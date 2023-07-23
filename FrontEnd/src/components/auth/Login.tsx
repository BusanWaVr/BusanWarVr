import { useState } from "react";
import GeneralLogin from "./GeneralLogin";
import GuideLogin from "./GuideLogin";
import styled from "styled-components";

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
  width: 50%;
  color: black;
  font-weight: 700;
`;

interface Props {
  setOnLoginModal: any;
  setIsLoggedIn: any;
}

function Login({ setOnLoginModal, setIsLoggedIn }: Props) {
  const [isGeneralLoginVisible, setIsGeneralLoginVisible] = useState(true);

  const toggleLoginType = (isGeneral: boolean) => {
    if (
      (isGeneral && !isGeneralLoginVisible) ||
      (!isGeneral && isGeneralLoginVisible)
    ) {
      setIsGeneralLoginVisible((prevState) => !prevState);
    }
  };

  return (
    <LoginWrapper className="login-form">
      <LoginMenu className="login-menu">
        <LoginLink
          onClick={() => toggleLoginType(true)}
          style={{
            borderBottom: isGeneralLoginVisible
              ? "2px solid #7f9dff"
              : "2px solid transparent",
          }}
        >
          일반 로그인
        </LoginLink>
        <LoginLink
          onClick={() => toggleLoginType(false)}
          style={{
            borderBottom: !isGeneralLoginVisible
              ? "2px solid #FF9090"
              : "2px solid transparent",
          }}
        >
          가이드 로그인
        </LoginLink>
      </LoginMenu>
      <div className="login-wrapper">
        {isGeneralLoginVisible ? (
          <GeneralLogin
            setOnLoginModal={setOnLoginModal}
            setIsLoggedIn={setIsLoggedIn}
          />
        ) : (
          <GuideLogin />
        )}
      </div>
    </LoginWrapper>
  );
}
export default Login;
