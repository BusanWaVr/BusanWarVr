import React, { useState } from "react";
import axios from "axios";

interface EditProfileProps {
  // 필요한 다른 프롭스들을 여기에 추가하세요
}

function GeneralUpdate(props: EditProfileProps) {
  const [name, setName] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [isNickname, setIsNickname] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [passwordChangeMessage, setPasswordChangeMessage] = useState("");
  // const [passwordConfirm, setPasswordConfirm] = useState("");

  const [nameMessage, setNameMessage] = useState("");
  const [categoryMessage, setCategoryMessage] = useState(""); // 카테고리 메시지
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  const [isName, setIsName] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  // 카테고리
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

  const handleCategoryChange = (category: string) => {
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];
    if (imageFile) {
      setSelectedImageFile(imageFile); // 이미지 파일을 selectedImageFile로 설정
      setSelectedImage(URL.createObjectURL(imageFile));
    }
    console.log(selectedImage);
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
    setNewPassword(currentPassword);
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

  async function handleSubmitName(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const requestBody = {
        nickname: name,
      };
      console.log(requestBody);
      const response = await fetch("http://52.79.93.203/auth/nickname", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      console.log(response);
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

  async function handleSubmitPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const requestBody = {
        password: password,
      };
      console.log(requestBody);

      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch("http://52.79.93.203/auth/password", {
        method: "POST",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      console.log(response);
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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

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
        console.log(requestBody);

        const accessToken = localStorage.getItem("accessToken");

        const response = await axios.put(
          "http://52.79.93.203/user/password",
          requestBody,
          {
            headers: {
              Authorization: accessToken,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.message === "비밀번호를 변경했습니다.") {
          console.log(response.data);
          setPasswordChangeMessage("비밀번호가 변경되었습니다!");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setPasswordMatch(false);
    }
  };

  const handleSave = async () => {
    try {
      const categoriesString = selectedCategories.join(",");

      const formData = new FormData();
      formData.append("nickname", name);
      formData.append("category", categoriesString);
      console.log(formData);
      // 이미지를 선택한 경우에만 FormData에 추가
      if (selectedImageFile) {
        formData.append("profileImg", selectedImageFile);
      }
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.put("http://52.79.93.203/user", formData, {
        headers: {
          Authorization: accessToken,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("response", response.data);
      console.log("저장되었습니다!");
      localStorage.setItem("nickname", name);
      if (selectedImageFile) {
        localStorage.setItem("profileImg", selectedImageFile);
      }
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
            <input
              type="text"
              value={name}
              onChange={onChangeName}
              // onChange={(e) => setName(e.target.value)}
            />
          </label>

          <div>
            <button
              type="submit"
              disabled={name === localStorage.getItem("nickname")}
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
            {!passwordChangeMessage && passwordMatch && (
              <p style={{ color: "green" }}>비밀번호가 확인되었습니다.</p>
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
        <div className="form-el">
          <label>관심 카테고리를 선택해주세요. (최소 3개, 최대 5개)</label>{" "}
          <p>{categoryMessage}</p>
          <br />
          {categoriesList.map((category, index) => (
            <React.Fragment key={category.name}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.name)}
                  onChange={() => handleCategoryChange(category.name)}
                />
                {category.label}
              </label>{" "}
              {index % 5 === 4 && <br />}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div>
        <form>
          <label>프로필 이미지 업로드:</label>
          <input type="file" onChange={handleImageUpload} accept="image/*" />
        </form>
        {selectedImage && (
          <div>
            <p>미리보기:</p>
            <img
              src={selectedImage}
              alt="Uploaded"
              style={{ width: "200px", height: "auto" }}
            />
          </div>
        )}
      </div>
      <div>{isNickname && <button onClick={handleSave}>저장하기</button>}</div>
    </div>
  );
}

export default GeneralUpdate;
