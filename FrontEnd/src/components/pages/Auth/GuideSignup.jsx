import React, { useState } from "react";
import axios from "axios";

const GuideSignup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");

  const [nameMessage, setNameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [emailVerifyMessage, setEmailVerifyMessage] = useState("");
  const [codeMessage, setCodeMessage] = useState(""); // 인증코드 받기 할시 메세지
  const [verificationCode, setVerificationCode] = useState(""); // 인증코드 입력한것
  const [nicknameMessage, setNicknameMessage] = useState(""); // 닉네임 중복 메시지

  const [isName, setIsName] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isEmailConfirm, setIsEmailConfirm] = useState(false);
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const [isNickname, setIsNickname] = useState(false);

  //   카테고리

  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

    if (!emailRegExp.test(currentEmail)) {
      setEmailMessage("이메일 형식이 올바르지 않습니다.");
      setIsEmail(false);
    } else {
      setEmailMessage("");
      setIsEmail(true);
    }
  };

  // 이메일 인증 번호 발송

  const handleVerification = async () => {
    try {
      const response = await fetch("http://52.79.93.203/auth/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      console.log(data);

      if (data.code === "200") {
        setCodeMessage("메일로 인증 번호가 발송되었습니다.");
        setShowVerificationForm(true);
      } else if (data.status === "409") {
        // 중복
        setCodeMessage("이미 가입한 이메일 입니다. 로그인 해주세요.");
      } else {
        // 에러
        setCodeMessage("죄송합니다. 잠시 후 다시 시도해 주세요.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 이메일 인증번호 검증
  const handleSubmitVerificationCode = async (e) => {
    e.preventDefault();

    try {
      const requestBody = {
        email: email,
        code: verificationCode,
      };

      const response = await fetch("http://52.79.93.203/auth/code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data.code === "200") {
        setEmailVerifyMessage("이메일 인증이 완료되었습니다.");
        setIsEmailConfirm(true);
      } else {
        // 이때 500 에러뜸
        setEmailVerifyMessage("인증 번호가 일치하지 않습니다.");
        setIsEmailConfirm(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 닉네임 중복 체크
  const handleSubmitName = async (e) => {
    e.preventDefault();

    try {
      const requestBody = {
        nickname: name,
      };

      const response = await fetch("http://52.79.93.203/auth/nickname", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data.code === "200") {
        setNicknameMessage("사용 가능한 닉네임입니다.");
        setIsNickname(true);
      } else if (data.status === "409") {
        // 중복
        setNicknameMessage("중복된 닉네임입니다. 다른 닉네임을 사용해 주세요.");
      } else {
        // 에러
        setNicknameMessage("죄송합니다. 잠시 후 다시 시도해 주세요.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeName = (e) => {
    const currentName = e.target.value;
    setName(currentName);

    const regex = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]*$/;

    if (
      !regex.test(currentName) ||
      currentName.length < 2 ||
      currentName.length > 8
    ) {
      setNameMessage("특수문자와 공백 없이 2자 이상 8자 이하로 입력해 주세요.");
      setIsName(false);
    } else {
      setNameMessage("");
      setIsName(true);
    }
  };

  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp =
      /^(?=.[A-Za-z])(?=.*\d)(?=.*[!@#$%])[A-Za-z\d!@#$%]{10,}$/;

    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage(
        "영문, 숫자, 특수문자(!@#$%)를 모두 포함하여 10자 이상 입력해 주세요."
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호 입니다.");
      setIsPassword(true);
    }
  };

  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);
    if (password !== currentPasswordConfirm) {
      setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("비밀번호가 일치합니다.");
      setIsPasswordConfirm(true);
    }
  };

  const createFormData = async (name, email, password) => {
    const formData = new FormData();
    formData.append("nickname", name);
    formData.append("email", email);
    formData.append("password", password);
    return formData;
  };

  // 회원가입

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("슈웃");

    // 상태 값 업데이트 이후 즉시 formData 구성
    if (isEmailConfirm && isNickname && isPassword && isPasswordConfirm) {
      const formData = await createFormData(name, email, password);

      console.log(formData);
      const apiUrl = "http://52.79.93.203/guide";

      try {
        const response = await axios.post(apiUrl, formData);
        if (response.data.code === "200") {
          alert(response.data.message);
          console.log(response.data);
          // TODO : 로그인 된 상태로 메인화면으로 이동
          window.location.href = "/";
        }
      } catch (error) {
        console.log(error.response.data);
        if (error.response.data.status === "409") {
          alert(error.response.data.message);
        } else {
          alert("죄송합니다. 잠시 후 다시 시도해 주세요.");
        }
      }
    } else {
      // 필수 필드들이 모두 입력되지 않았을 경우
      alert("모든 필수 정보를 입력해주세요.");
    }
  };

  return (
    <>
      <h3>
        <strong>가이드</strong> 회원가입
      </h3>
      <div className="form">
        <div className="form-el">
          <label htmlFor="email">이메일</label> <br />
          <input
            id="email"
            name="name"
            value={email}
            onChange={onChangeEmail}
            disabled={isEmail}
          />
          <p className="message">{emailMessage}</p>
          <button onClick={handleVerification} disabled={!isEmail}>인증번호받기</button>
          <div>
            <p>{codeMessage}</p>
            {showVerificationForm && (
              <form onSubmit={handleSubmitVerificationCode}>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  disabled={isEmail}
                />
                <button type="submit">인증</button>
              </form>
            )}
          </div>
          <p className="message">{emailVerifyMessage}</p>
        </div>

        <div className="form-el">
          <label htmlFor="password">비밀번호</label> <br />
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChangePassword}
          />
          <p className="message">{passwordMessage}</p>
        </div>
        <div className="form-el">
          <label htmlFor="passwordConfirm">비밀번호 확인</label> <br />
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={onChangePasswordConfirm}
          />
          <p className="message">{passwordConfirmMessage}</p>
        </div>
        <div className="form-el">
          <form onSubmit={handleSubmitName}>
            <label htmlFor="name">닉네임</label> <br />
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={onChangeName}
            />
            <button type="submit" disabled={!isName}>
              중복확인
            </button>
            <p className="message">{nameMessage}</p>
            <p>{nicknameMessage}</p>
          </form>
        </div>
        <br />
        <br />
        <button type="submit" onClick={handleSubmit}>
          가입하기
        </button>
      </div>
    </>
  );
};

export default GuideSignup;
