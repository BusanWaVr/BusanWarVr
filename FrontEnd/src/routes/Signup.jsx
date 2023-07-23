import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const [idMessage, setIdMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  const [isId, setIsId] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isEmail, setIsEmail] = useState(false);

  //   카테고리
  // TODO : 3개 미만으로 선택시 알림메시지
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategorySelection = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      if (selectedCategories.length < 3) {
        setSelectedCategories([...selectedCategories, category]);
      }
    }
  };

  //
  const onChangeProfileImage = (e) => {
    const imageFile = e.target.files[0];
    setProfileImage(imageFile);
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
      setEmailMessage("사용 가능한 이메일 입니다.");
      setIsEmail(true);
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
      setNameMessage(
        "닉네임은 특수문자와 공백 없이 2자 이상 8자 이하여야 합니다."
      );
      setIsName(false);
    } else {
      setNameMessage("사용 가능한 닉네임 입니다.");
      setIsName(true);
    }
  };

  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage("~~로 입력해주세요");
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("아아아ㅏ");

    // 상태 값 업데이트 이후 즉시 formData 구성
    if (
      isEmail &&
      isName &&
      isPassword &&
      isPasswordConfirm &&
      selectedCategories.length >= 3
    ) {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("nickname", name);
      formData.append("password", password);
      formData.append("category", JSON.stringify(selectedCategories));
      formData.append("profileImg", profileImage);

      const apiUrl = "http://18.217.191.122:8080/user";

      try {
        const response = await axios.post(apiUrl, formData);
        // 성공 모달 표시
        alert("회원가입이 완료되었습니다.");

        // 로그인 페이지로 리디렉션
        window.location.href = "/login";
      } catch (error) {
        // 서버에서 보내준 오류 메시지 확인
        console.error("폼 제출 중 오류 발생:", error.response.data);
      }
    } else {
      // 필수 필드들이 모두 입력되지 않았을 경우, 에러 메시지 표시 또는 적절한 조치를 취해주세요.
      alert("모든 필수 정보를 입력해주세요.");
    }
  };

  return (
    <>
      <h3>Sign Up</h3>
      <div className="form">
        <div className="form-el">
          <label htmlFor="profileImage">프로필 이미지</label>
          <br />
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            onChange={onChangeProfileImage}
          />
        </div>

        <div className="form-el">
          <label htmlFor="email">이메일</label> <br />
          <input
            id="email"
            name="name"
            value={email}
            onChange={onChangeEmail}
          />
          <p className="message">{emailMessage}</p>
        </div>

        <div className="form-el">
          <label htmlFor="password">비밀번호</label> <br />
          <input
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
            id="passwordConfirm"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={onChangePasswordConfirm}
          />
          <p className="message">{passwordConfirmMessage}</p>
        </div>
        <div className="form-el">
          <label htmlFor="name">닉네임</label> <br />
          <input id="name" name="name" value={name} onChange={onChangeName} />
          <p className="message">{nameMessage}</p>
        </div>
        <br />
        <br />
        <div className="form-el">
          <label>관심 카테고리를 선택해주세요. (최소3개, 최대5개)</label> <br />
          <label>
            <input
              type="checkbox"
              checked={selectedCategories.includes("힐링")}
              onChange={() => handleCategorySelection("힐링")}
            />
            힐링
          </label>{" "}
          <br />
          <label>
            <input
              type="checkbox"
              checked={selectedCategories.includes("액티비티")}
              onChange={() => handleCategorySelection("액티비티")}
            />
            액티비티
          </label>{" "}
          <br />
          <label>
            <input
              type="checkbox"
              checked={selectedCategories.includes("체험")}
              onChange={() => handleCategorySelection("체험")}
            />
            체험
          </label>{" "}
          <br />
          <label>
            <input
              type="checkbox"
              checked={selectedCategories.includes("도보")}
              onChange={() => handleCategorySelection("도보")}
            />
            도보
          </label>{" "}
          <br />
          <label>
            <input
              type="checkbox"
              checked={selectedCategories.includes("캠핑")}
              onChange={() => handleCategorySelection("캠핑")}
            />
            캠핑
          </label>{" "}
          <br />
          <label>
            <input
              type="checkbox"
              checked={selectedCategories.includes("호캉스")}
              onChange={() => handleCategorySelection("호캉스")}
            />
            호캉스
          </label>{" "}
          <br />
          <label>
            <input
              type="checkbox"
              checked={selectedCategories.includes("맛집")}
              onChange={() => handleCategorySelection("맛집")}
            />
            맛집
          </label>{" "}
          <br />
          <label>
            <input
              type="checkbox"
              checked={selectedCategories.includes("도시")}
              onChange={() => handleCategorySelection("도시")}
            />
            도시
          </label>{" "}
          <br />
          <label>
            <input
              type="checkbox"
              checked={selectedCategories.includes("자연")}
              onChange={() => handleCategorySelection("자연")}
            />
            자연
          </label>{" "}
          <br />
          <label>
            <input
              type="checkbox"
              checked={selectedCategories.includes("문화")}
              onChange={() => handleCategorySelection("문화")}
            />
            문화
          </label>{" "}
          <br />
          <label>
            <input
              type="checkbox"
              checked={selectedCategories.includes("쇼핑")}
              onChange={() => handleCategorySelection("쇼핑")}
            />
            쇼핑
          </label>{" "}
          <br />
          <label>
            <input
              type="checkbox"
              checked={selectedCategories.includes("역사")}
              onChange={() => handleCategorySelection("역사")}
            />
            역사
          </label>{" "}
          <br />
          <label>
            <input
              type="checkbox"
              checked={selectedCategories.includes("축제")}
              onChange={() => handleCategorySelection("축제")}
            />
            축제
          </label>{" "}
          <br />
          <label>
            <input
              type="checkbox"
              checked={selectedCategories.includes("핫플")}
              onChange={() => handleCategorySelection("핫플")}
            />
            핫플
          </label>{" "}
          <br />
          <label>
            <input
              type="checkbox"
              checked={selectedCategories.includes("카페")}
              onChange={() => handleCategorySelection("카페")}
            />
            카페
          </label>{" "}
          <br />
          <br />
        </div>
        <button type="submit" onClick={handleSubmit}>
          가입하기
        </button>
      </div>
    </>
  );
};

export default Signup;
