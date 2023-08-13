import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileImageUpload from "./ProfileImageUpdate";
import { toast } from "react-toastify";

function GuideUpdate() {
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
  const [nameMessage, setNameMessage] = useState("");
  const [isName, setIsName] = useState(true);
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [isNickname, setIsNickname] = useState(true);

  const [selectedImageFile, setSelectedImageFile] = useState(null);

  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isPassword, setIsPassword] = useState(true);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(true);

  const [newPassword, setNewPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [passwordChangeMessage, setPasswordChangeMessage] = useState("");
  const [passwordDBCheck, setPasswordDBCheck] = useState(false);

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
    if (currentName === localStorage.getItem("nickname")) {
      setIsName(true);
      setIsNickname(true);
    } else {
      setIsName(false);
      setIsNickname(false);
    }

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
  async function handleSubmitName(e: React.FormEvent<HTMLFormElement>) {
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

      if (data.code === "200" || name === localStorage.getItem("nickname")) {
        setNicknameMessage("사용 가능한 닉네임입니다.");
        setIsNickname(true);
      } else if (data.status === "409") {
        setNicknameMessage("중복된 닉네임입니다. 다른 닉네임을 사용해 주세요.");
        setIsNickname(false);
      } else {
        setNicknameMessage("죄송합니다. 잠시 후 다시 시도해 주세요.");
        setIsNickname(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // 비밀번호 변경
  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setNewPassword(currentPassword);
    setIsPassword(false);
    setIsPasswordConfirm(false);
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
    setConfirmPassword(currentPasswordConfirm);
    if (newPassword !== currentPasswordConfirm) {
      setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("비밀번호가 일치합니다.");
      setIsPasswordConfirm(true);
    }
  };
  async function handleSubmitPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

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
        // 새로운 비밀번호와 확인용 비밀번호 입력 창을 활성화
        setIsPasswordMatch(true);
      } else {
        setNicknameMessage("비밀번호가 일치하지 않습니다.");
        setIsPasswordMatch(false);
      }

      // data를 사용해서 비밀번호 일치 여부를 확인하고 처리하는 로직을 추가하면 됩니다.
    } catch (error) {
      console.error(error);
    }
  }
  const handleSubmitNewPassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // 비밀번호 일치 여부 확인
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
          setPasswordDBCheck(true);
        } else if (response.data.message === "비밀번호를 변경했습니다.") {
          setPasswordDBCheck(false);
          setPasswordChangeMessage("비밀번호가 변경되었습니다!");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setPasswordMatch(false);
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
    if (!isNickname || !isName) {
      toast.warning("닉네임을 확인해주세요.");
      return;
    } else if (!isPassword || !isPasswordConfirm) {
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
        localStorage.setItem("imageFile", selectedImageFile);
      }
      if (introduction) {
        localStorage.setItem("introduce", introduction);
      }
      window.location.href = `http://127.0.0.1:5173/guide/${userId}/mypage/`;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmitName}>
          <label>
            닉네임:
            <input type="text" value={name} onChange={onChangeName} />
          </label>

          <div>
            <button
              type="submit"
              disabled={!isName || name === localStorage.getItem("nickname")}
            >
              닉네임 확인
            </button>
            <p className="message">{nameMessage}</p>
            <p>{nicknameMessage}</p>
          </div>

          {name === localStorage.getItem("nickname") && (
            <p>현재 사용 중인 닉네임과 동일합니다.</p>
          )}
        </form>
      </div>
      <div>
        <form onSubmit={handleSubmitPassword}>
          <label>
            비밀번호:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">비밀번호 확인</button>
        </form>
      </div>
      <div>
        {isPasswordMatch && (
          <form onSubmit={handleSubmitNewPassword}>
            <label>
              새 비밀번호:
              <input
                type="password"
                value={newPassword}
                onChange={onChangePassword}
              />
            </label>
            <p className="message">{passwordMessage}</p>
            <br />
            <label>
              새 비밀번호 확인:
              <input
                type="password"
                value={confirmPassword}
                onChange={onChangePasswordConfirm}
              />
            </label>
            <p className="message">{passwordConfirmMessage}</p>
            {!passwordMatch && !passwordChangeMessage && (
              <p style={{ color: "red" }}>새 비밀번호가 일치하지 않습니다.</p>
            )}
            {!passwordChangeMessage && passwordMatch && passwordDBCheck && (
              <p style={{ color: "green" }}>비밀번호가 확인되었습니다.</p>
            )}
            {!passwordChangeMessage &&
              passwordMatch &&
              !passwordDBCheck &&
              newPassword === password && (
                <p style={{ color: "red" }}>기존 비밀번호와 동일합니다.</p>
              )}
            <br />
            <button type="submit">비밀번호 변경</button>
            {passwordChangeMessage && newPassword === confirmPassword && (
              <p style={{ color: "green" }}>비밀번호가 변경되었습니다.</p>
            )}
          </form>
        )}
      </div>
      <div>
        <ProfileImageUpload
          selectedImageFile={selectedImageFile}
          handleImageChange={(files) => handleImageUpload(files)}
        />
      </div>
      <div>
        <form>
          <label>자기소개 (최대 150자):</label>
          <textarea
            value={introduction}
            onChange={onChangeIntroduction}
            rows={4}
            maxLength={150}
          />
          <p className="message">{introductionMessage}</p>
        </form>
      </div>
      <div>
        <button onClick={handleSave}>저장하기</button>
      </div>
    </div>
  );
}

export default GuideUpdate;
