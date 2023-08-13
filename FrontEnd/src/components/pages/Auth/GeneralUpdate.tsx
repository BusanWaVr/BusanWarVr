import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileImageUpload from "./ProfileImageUpdate";
import { toast } from "react-toastify";
import { Button, Checkbox, Form, Input } from "antd";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { ThemeProvider, createTheme } from "@mui/material";

function GeneralUpdate() {
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

  const [categoryMessage, setCategoryMessage] = useState(""); // 카테고리 메시지
  const [isCategory, setIsCategory] = useState(true);

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

  // 이미지 변경
  const handleImageUpload = (files: any[]) => {
    setSelectedImageFile(files[0].originFileObj);
  };

  // 카테고리 변경
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
  const localCategories = localStorage.getItem("category");
  const [selectedCategories, setSelectedCategories] = useState(
    localCategories.split(",")
  );
  const handleCategoryChange = (category: string) => {
    setIsCategory(false);

    const updatedCategories = [...selectedCategories] as string[];
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

  // 수정 버튼
  const currentNickname = localStorage.getItem("nickname");
  const handleSave = async () => {
    if (!isNicknameValid || !isName) {
      toast.warning("닉네임을 확인해주세요.");
      return;
    } else if (!isPasswordValid || !isPasswordConfirm) {
      toast.warning("비밀번호를 확인해주세요.");
      return;
    } else if (!isCategory) {
      toast.warning("카테고리를 확인해주세요.");
    }
    try {
      const categoriesString = selectedCategories.join(",");
      localStorage.setItem("category", categoriesString);

      const formData = new FormData();

      if (name !== currentNickname) {
        formData.append("nickname", name);
        localStorage.setItem("nickname", name);
      } else {
        formData.append("nickname", currentNickname);
      }
      formData.append("category", categoriesString);

      if (selectedImageFile) {
        formData.append("profileImg", selectedImageFile);
      }
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.put(
        "https://busanwavrserver.store/user",
        formData,
        {
          headers: {
            Authorization: accessToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("성공적으로 회원정보가 변경되었습니다.");
      if (selectedImageFile) {
        localStorage.setItem("profileImg", response.data.data.profileImg);
      }
      window.location.href = `http://127.0.0.1:5173/user/${userId}/mypage/`;
    } catch (error) {
      console.error(error);
    }
  };

  const initialValues = {
    nickname: name,
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
            닉네임 확인
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
          validateStatus={
            !password ? "success" : isPasswordMatch ? "success" : "error"
          }
          help={passwordMessage}
        >
          <Input.Password
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={!password} ghost>
            비밀번호 확인
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
              비밀번호 변경
            </Button>
          </Form.Item>
        </Form>
      )}
      <ThemeProvider theme={customTheme}>
        <p style={{ fontSize: "14px", color: "rgba(0, 0, 0, 0.88)" }}>
          카테고리
        </p>
        <Stack direction="row" className="flex-wrap justify-center gap-3 py-3">
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

      <Button type="primary" onClick={handleSave} className="p-3">
        수정하기
      </Button>
    </div>
    // <div>
    //   <div>
    //     <form onSubmit={handleSubmitName}>
    //       <label>
    //         닉네임:
    //         <input
    //           type="text"
    //           value={name}
    //           onChange={onChangeName}
    //           // onChange={(e) => setName(e.target.value)}
    //         />
    //       </label>

    //       <div>
    //         <button
    //           type="submit"
    //           disabled={!isName || name === currentNickname}
    //         >
    //           닉네임 확인
    //         </button>
    //         <p className="message">{nameMessage}</p>
    //         <p>{nicknameMessage}</p>
    //       </div>

    //       {name === localStorage.getItem("nickname") && (
    //         <p>현재 사용 중인 닉네임과 동일합니다.</p>
    //       )}
    //     </form>
    //   </div>
    //   <div>
    //     <form onSubmit={handleSubmitPassword}>
    //       <label>
    //         비밀번호:
    //         <input
    //           type="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //       </label>
    //       <button type="submit">비밀번호 확인</button>
    //     </form>
    //   </div>
    //   <div>
    //     {isPasswordMatch && (
    //       <form onSubmit={handleSubmitNewPassword}>
    //         <label>
    //           새 비밀번호:
    //           <input
    //             type="password"
    //             value={newPassword}
    //             onChange={onChangePassword}
    //           />
    //         </label>
    //         <p className="message">{passwordMessage}</p>
    //         <br />
    //         <label>
    //           새 비밀번호 확인:
    //           <input
    //             type="password"
    //             value={confirmPassword}
    //             onChange={onChangePasswordConfirm}
    //           />
    //         </label>
    //         <p className="message">{passwordConfirmMessage}</p>
    //         {!passwordMatch && !passwordChangeMessage && (
    //           <p style={{ color: "red" }}>새 비밀번호가 일치하지 않습니다.</p>
    //         )}
    //         {!passwordChangeMessage && passwordMatch && passwordDBCheck && (
    //           <p style={{ color: "green" }}>비밀번호가 확인되었습니다.</p>
    //         )}
    //         {!passwordChangeMessage &&
    //           passwordMatch &&
    //           !passwordDBCheck &&
    //           newPassword === password && (
    //             <p style={{ color: "red" }}>기존 비밀번호와 동일합니다.</p>
    //           )}
    //         <br />
    //         <button type="submit">비밀번호 변경</button>
    //         {passwordChangeMessage && newPassword === confirmPassword && (
    //           <p style={{ color: "green" }}>비밀번호가 변경되었습니다.</p>
    //         )}
    //       </form>
    //     )}
    //   </div>
    //   <div>
    //     <div className="form-el">
    //       <label>관심 카테고리를 선택해주세요. (최소 3개, 최대 5개)</label>{" "}
    //       <p>{categoryMessage}</p>
    //       <br />
    //       {categoriesList.map((category, index) => (
    //         <React.Fragment key={category.name}>
    //           <label>
    //             <input
    //               type="checkbox"
    //               checked={selectedCategories.includes(category.name)}
    //               onChange={() => handleCategoryChange(category.name)}
    //             />
    //             {category.label}
    //           </label>{" "}
    //           {index % 5 === 4 && <br />}
    //         </React.Fragment>
    //       ))}
    //     </div>
    //   </div>
    //   <div>
    //     <ProfileImageUpload
    //       selectedImageFile={selectedImageFile}
    //       handleImageChange={(files) => handleImageUpload(files)}
    //     />
    //   </div>
    //   <div>
    //     <button onClick={handleSave}>저장하기</button>
    //   </div>
    // </div>
  );
}

export default GeneralUpdate;
