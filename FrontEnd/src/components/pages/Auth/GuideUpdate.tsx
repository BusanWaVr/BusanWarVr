import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileImageUpload from "./ProfileImageUpdate";
import { toast } from "react-toastify";
import { Button, Form, Input } from "antd";
import { useI18n } from "../../../hooks/useI18n"

function GuideUpdate() {
  const t = useI18n()
  const convertURLtoFile = async (url: string) => {
    try {
      const response = await fetch(url);
      const data = await response.blob();
      const ext = url.split(".").pop();
      const metadata = { type: `image/${ext}` };
      const filename = url.split("/").pop();
      return new File([data], filename!, metadata);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const [name, setName] = useState(`${localStorage.getItem("nickname")}`);
  const [isName, setIsName] = useState(true);
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState(true);

  const [selectedImageFile, setSelectedImageFile] = useState(null);

  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [newPasswordMessage, setNewPasswordMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(true);

  const [newPassword, setNewPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);

  const [introduction, setIntroduction] = useState(
    `${localStorage.getItem("introduce")}`
  );
  const [introductionMessage, setIntroductionMessage] = useState("");
  const [isIntroduction, setIsIntroduction] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchImage = async () => {
      const currentProfileImage = await convertURLtoFile(
        localStorage.getItem("profileImg")
      );
      setSelectedImageFile(currentProfileImage);
    };
    fetchImage();
  }, []);

  const handleImageUpload = (files: any[]) => {
    setSelectedImageFile(files[0].originFileObj);
  };

  // 닉네임 변경
  const onChangeName = (e) => {
    const currentName = e.target.value;
    setName(currentName);

    const regex = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]*$/;
    if (currentName === localStorage.getItem("nickname")) {
      setIsName(true);
      setIsNicknameValid(true);
      setNicknameMessage("현재 사용 중인 닉네임과 동일합니다.");
    } else if (
      !regex.test(currentName) ||
      currentName.length < 2 ||
      currentName.length > 8
    ) {
      setNicknameMessage(
        "특수문자와 공백 없이 2자 이상 8자 이하로 입력해 주세요."
      );
      setIsName(false);
    } else {
      setNicknameMessage("");
      setIsName(true);
    }
  };
  function handleSubmitName() {
    const checkNickname = async () => {
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
        if (data.code === "200" || name === localStorage.getItem("nickname")) {
          setNicknameMessage("사용 가능한 닉네임입니다.");
          setIsNicknameValid(true);
        } else if (data.status === "409") {
          setNicknameMessage(
            "중복된 닉네임입니다. 다른 닉네임을 사용해 주세요."
          );
          setIsNicknameValid(false);
        } else {
          setNicknameMessage("죄송합니다. 잠시 후 다시 시도해 주세요.");
          setIsNicknameValid(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkNickname();
  }

  // 비밀번호 변경
  useEffect(() => {
    if (newPassword !== confirmPassword) {
      setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
    }
  }, [newPassword, confirmPassword]);
  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setNewPassword(currentPassword);
    setIsPasswordValid(false);
    setIsPasswordConfirm(false);
    const passwordRegExp =
      /^(?=.[A-Za-z])(?=.*\d)(?=.*[!@#$%])[A-Za-z\d!@#$%]{10,}$/;

    if (!passwordRegExp.test(currentPassword)) {
      setNewPasswordMessage(
        "영문, 숫자, 특수문자(!@#$%)를 모두 포함하여 10자 이상 입력해 주세요."
      );
      setIsPasswordValid(false);
    } else if (currentPassword === password) {
      setNewPasswordMessage("기존 비밀번호와 동일합니다.");
      setIsPasswordValid(false);
    } else {
      setNewPasswordMessage("안전한 비밀번호 입니다.");
      setIsPasswordValid(true);
    }
  };
  async function handleSubmitPassword() {
    const checkPassword = async () => {
      try {
        const requestBody = {
          password: password,
        };

        const accessToken = localStorage.getItem("accessToken");

        const response = await fetch(
          "https://busanwavrserver.store/auth/password",
          {
            method: "POST",
            headers: {
              Authorization: accessToken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        const data = await response.json();

        if (data.message === "비밀번호가 일치합니다.") {
          setPasswordMessage("");
          setIsPasswordMatch(true);
        } else {
          setPasswordMessage("비밀번호가 일치하지 않습니다.");
          setIsPasswordMatch(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkPassword();
  }
  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setConfirmPassword(currentPasswordConfirm);
    if (newPassword !== currentPasswordConfirm) {
      setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("비밀번호가 일치합니다.");
      setIsPasswordConfirm(true);
    }
  };
  const handleSubmitNewPassword = async () => {
    if (newPassword === confirmPassword) {
      try {
        const requestBody = {
          password: newPassword,
        };

        const accessToken = localStorage.getItem("accessToken");

        const response = await axios.put(
          "https://busanwavrserver.store/user/password",
          requestBody,
          {
            headers: {
              Authorization: accessToken,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 500) {
        } else if (response.data.message === "비밀번호를 변경했습니다.") {
          toast.success("비밀번호가 변경되었습니다!");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // 한줄 소개 변경
  const onChangeIntroduction = (e) => {
    const currentIntroduction = e.target.value;
    setIntroduction(currentIntroduction);
    setIsIntroduction(false);

    if (currentIntroduction.length > 150) {
      setIntroductionMessage("자기소개는 150자 이내로 입력해 주세요.");
      setIsIntroduction(false);
    } else {
      setIntroductionMessage("");
      setIsIntroduction(true);
    }
    localStorage.setItem("introduce", currentIntroduction);
  };

  // 수정 버튼
  const currentNickname = localStorage.getItem("nickname");
  const handleSave = async () => {
    if (!isNicknameValid || !isName) {
      toast.warning("닉네임을 확인해주세요.");
      return;
    } else if (!isPasswordValid || !isPasswordConfirm) {
      toast.warning("비밀번호를 확인해주세요.");
      return;
    } else if (!isIntroduction) {
      toast.warning("한줄 소개를 확인해주세요.");
    }
    try {
      const formData = new FormData();

      if (name !== currentNickname) {
        formData.append("nickname", name);
        localStorage.setItem("nickname", name);
      } else {
        formData.append("nickname", currentNickname);
      }

      formData.append("introduction", introduction);
      // 이미지를 선택한 경우에만 FormData에 추가
      if (selectedImageFile) {
        formData.append("profileImg", selectedImageFile);
      }
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.put(
        "https://busanwavrserver.store/guide",
        formData,
        {
          headers: {
            Authorization: accessToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("정보가 수정되었습니다.");

      localStorage.setItem("nickname", name);
      if (selectedImageFile) {
        localStorage.setItem("profileImg", response.data.data.profileImg);
      }
      if (introduction) {
        localStorage.setItem("introduce", introduction);
      }
      window.location.href = `http://127.0.0.1:5173/guide/${userId}/mypage/`;
    } catch (error) {
      console.error(error);
    }
  };

  const initialValues = {
    nickname: name,
    introduction: introduction,
  };

  return (
    <div className="flex flex-col items-left w-96">
      <ProfileImageUpload
        selectedImageFile={selectedImageFile}
        handleImageChange={(files) => handleImageUpload(files)}
      />
      <Form
        style={{ maxWidth: 600 }}
        initialValues={initialValues}
        onFinish={handleSubmitName}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="닉네임"
          name="nickname"
          rules={[{ required: true }]}
          validateStatus={isNicknameValid ? "success" : "error"}
          help={nicknameMessage}
        >
          <Input value={name} onChange={onChangeName} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!isName || name === localStorage.getItem("nickname")}
            ghost
          >
            {t(`닉네임 확인`)}
          </Button>
        </Form.Item>
      </Form>
      <Form
        style={{ maxWidth: 600 }}
        onFinish={handleSubmitPassword}
        initialValues={initialValues}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="비밀번호"
          rules={[{ required: true }]}
          validateStatus={isPasswordMatch ? "success" : "error"}
          help={passwordMessage}
        >
          <Input.Password
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" ghost>
          {t(`비밀번호 확인`)}
          </Button>
        </Form.Item>
      </Form>
      {isPasswordMatch && (
        <Form
          style={{ maxWidth: 600 }}
          onFinish={handleSubmitNewPassword}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="새 비밀번호"
            rules={[{ required: true }]}
            validateStatus={isPasswordValid ? "success" : "error"}
            help={newPasswordMessage}
          >
            <Input.Password name="password" onChange={onChangePassword} />
          </Form.Item>
          <Form.Item
            label="새 비밀번호 재입력"
            rules={[{ required: true }]}
            validateStatus={isPasswordConfirm ? "success" : "error"}
            help={passwordConfirmMessage}
          >
            <Input.Password
              name="password"
              onChange={onChangePasswordConfirm}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
            {t(`비밀번호 변경`)}
            </Button>
          </Form.Item>
        </Form>
      )}

      <Form
        style={{ maxWidth: 600 }}
        initialValues={initialValues}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item name="introduction" label="한 줄 소개">
          <Input.TextArea
            value={introductionMessage}
            onChange={onChangeIntroduction}
            maxLength={150}
          />
        </Form.Item>
      </Form>

      <Button type="primary" onClick={handleSave}>
      {t(`수정하기`)}
      </Button>
    </div>
  );
}

export default GuideUpdate;
