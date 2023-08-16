import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Form, Input } from "antd";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { ThemeProvider, createTheme } from "@mui/material";
import { useI18n } from "../../../hooks/useI18n";

const Signup = () => {
  const t = useI18n();
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
  const [categoryMessage, setCategoryMessage] = useState(""); // 카테고리 메시지
  const [nicknameMessage, setNicknameMessage] = useState(""); // 닉네임 중복 메시지

  const [isName, setIsName] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isEmailConfirm, setIsEmailConfirm] = useState(false);
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const [isNickname, setIsNickname] = useState(false);

  //   카테고리
  const MaxAllowedCategories = 5;
  const MinRequiredCategories = 3;
  const categoriesList = [
    { name: "힐링", label: "힐링" },
    { name: "액티비티", label: "액티비티" },
    { name: "체험", label: "체험" },
    { name: "도보", label: "도보" },
    { name: "캠핑", label: "캠핑" },
    { name: "호캉스", label: "호캉스" },
    { name: "맛집", label: "맛집" },
    { name: "도시", label: "도시" },
    { name: "자연", label: "자연" },
    { name: "문화", label: "문화" },
    { name: "쇼핑", label: "쇼핑" },
    { name: "역사", label: "역사" },
    { name: "축제", label: "축제" },
    { name: "핫플", label: "핫플" },
    { name: "카페", label: "카페" },
  ];
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isCategory, setIsCategory] = useState(false);

  const handleCategoryChange = (category) => {
    const updatedCategories = [...selectedCategories];
    const categoryIndex = updatedCategories.indexOf(category);

    if (categoryIndex > -1) {
      updatedCategories.splice(categoryIndex, 1);
    } else {
      if (updatedCategories.length < MaxAllowedCategories) {
        updatedCategories.push(category);
      }
    }

    setSelectedCategories(updatedCategories);

    if (updatedCategories.length < MinRequiredCategories) {
      setCategoryMessage("카테고리는 최소 3개 이상 선택해 주세요.");
      setIsCategory(false);
    } else if (updatedCategories.length > MaxAllowedCategories) {
      setCategoryMessage("");
      setIsCategory(false);
    } else {
      setCategoryMessage("");
      setIsCategory(true);
    }
  };

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
      const response = await fetch("https://busanwavrserver.store/auth/email", {
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

      const response = await fetch("https://busanwavrserver.store/auth/code", {
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

      const response = await fetch(
        "https://busanwavrserver.store/auth/nickname",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

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

  const createFormData = async (name, email, password, selectedCategories) => {
    const formData = new FormData();
    formData.append("nickname", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("category", selectedCategories);
    return formData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 상태 값 업데이트 이후 즉시 formData 구성
    if (
      isEmailConfirm &&
      isName &&
      isPassword &&
      isPasswordConfirm &&
      isCategory &&
      isNickname
    ) {
      const formData = await createFormData(
        name,
        email,
        password,
        selectedCategories
      );

      const apiUrl = "https://busanwavrserver.store/user";

      try {
        const response = await axios.post(apiUrl, formData);
        if (response.data.code === "200") {
          toast.success(response.data.message);
          // TODO : 로그인 된 상태로 메인화면으로 이동
          window.location.href = "/";
        }
      } catch (error) {
        console.log(error.response.data);
        if (error.response.data.status === "409") {
          toast.error(error.response.data.message);
        } else {
          toast.error("죄송합니다. 잠시 후 다시 시도해 주세요.");
        }
      }
    } else {
      // 필수 필드들이 모두 입력되지 않았을 경우
      toast.warning("모든 필수 정보를 입력해주세요.");
    }
  };

  const customTheme = createTheme({
    palette: {
      primary: {
        main: "#1983FF",
        dark: "#006AE6",
      },
    },
  });

  return (
    <>
      <div className="flex flex-col items-left w-96 m-auto my-12">
        <h3 className="mb-12">
          <strong>{t(`일반 유저`)}</strong> {t(`회원가입`)}
        </h3>
        <Form style={{ maxWidth: 600 }} autoComplete="off" layout="vertical">
          <Form.Item
            label={t(`이메일`)}
            name="email"
            rules={[{ required: true, type: "email" }]}
            value={email}
            onChange={onChangeEmail}
            disabled={isEmailConfirm}
            help={t(`${emailMessage} ${codeMessage}`)}
          >
            <Input value={name} onChange={onChangeName} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleVerification}
              disabled={!isEmail}
              ghost
            >
              {t(`인증번호받기`)}
            </Button>
          </Form.Item>
          {showVerificationForm && (
            <>
              <Form.Item
                rules={[{ required: true }]}
                validateStatus={emailVerifyMessage ? "error" : ""}
                help={t(`${emailVerifyMessage}`)}
              >
                <Input
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  disabled={isEmailConfirm}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  onClick={handleSubmitVerificationCode}
                  ghost
                >
                  {t(`인증`)}
                </Button>
              </Form.Item>
            </>
          )}
          <Form.Item
            label={t(`비밀번호`)}
            rules={[{ required: true }]}
            help={passwordMessage}
          >
            <Input.Password
              id="password"
              name="password"
              value={password}
              onChange={onChangePassword}
            />
          </Form.Item>

          <Form.Item
            htmlFor="passwordConfirm"
            label={t(`비밀번호 확인`)}
            rules={[{ required: true }]}
            help={passwordConfirmMessage}
          >
            <Input.Password
              id="passwordConfirm"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={onChangePasswordConfirm}
            />
          </Form.Item>
          <Form style={{ maxWidth: 600 }} autoComplete="off" layout="vertical">
            <Form.Item
              label={t(`닉네임`)}
              name="nickname"
              rules={[{ required: true }]}
              help={t(`${nicknameMessage} ${nameMessage}`)}
            >
              <Input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={onChangeName}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                onClick={handleSubmitName}
                disabled={!isName}
                ghost
              >
                {t(`중복확인`)}
              </Button>
            </Form.Item>
          </Form>
          <ThemeProvider theme={customTheme}>
            <p style={{ fontSize: "14px", color: "rgba(0, 0, 0, 0.88)" }}>
              {t(`관심 카테고리를 선택해주세요. (최소 3개, 최대 5개)`)}
            </p>
            <Stack
              direction="row"
              className="flex-wrap justify-center gap-3 py-3"
            >
              {categoriesList.map((category, index) => (
                <Chip
                  key={category.name}
                  label={category.label}
                  variant={
                    selectedCategories.includes(category.name)
                      ? "filled"
                      : "outlined"
                  }
                  color="primary"
                  onClick={() => handleCategoryChange(category.name)}
                  disabled={
                    selectedCategories.length === MaxAllowedCategories &&
                    !selectedCategories.includes(category.name)
                  }
                />
              ))}
            </Stack>
          </ThemeProvider>
          <p>{categoryMessage}</p>
        </Form>

        <Button
          type="primary"
          htmlType="submit"
          onClick={handleSubmit}
          className="p-3"
        >
          {t(`가입하기`)}
        </Button>
      </div>
    </>
  );
};

export default Signup;
