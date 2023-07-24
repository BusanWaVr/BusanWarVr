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
  const [emailVerifyMessage, setEmailVerifyMessage] = useState("");
  const [codeMessage, setCodeMessage] = useState(""); // 인증코드 받기 할시 메세지
  const [verificationCode, setVerificationCode] = useState(""); // 인증코드 입력한것

  const [isId, setIsId] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [showVerificationForm, setShowVerificationForm] = useState(false);

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
    } else {
      setEmailMessage("사용 가능한 이메일 입니다.");
    }
  };

  // 이메일 인증 번호 발송

  const handleVerification = async () => {
    try {
      const response = await fetch("http://13.209.65.4/auth/email", {
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
      } else {
        // TODO : 이미 가입된 이메일 / 올바르지 않은 이메일 확인해보기
        setCodeMessage("올바른 이메일인지 다시 확인해주세요.");
      }
    } catch (error) {
      console.error("오류 발생:", error);
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

      const response = await fetch("http://13.209.65.4/auth/code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data.code === "200") {
        setEmailVerifyMessage("이메일 인증이 완료되었습니다.");
        setIsEmail(true);
      } else {
        setEmailVerifyMessage("인증 번호가 일치하지 않습니다.");
        // setIsEmail(false);
      }
    } catch (error) {
      console.error("오류 발생:", error);
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
      setPasswordMessage(
        "영문, 숫자, 특수문자 중 최소 2가지 이상으로 8자 이상 입력해주세요"
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

  const createFormData = async (
    name,
    email,
    password,
    profileImage,
    selectedCategories
  ) => {
    const formData = new FormData();
    formData.append("nickname", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profileImg", profileImage);
    formData.append("category", selectedCategories);
    return formData;
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
      const formData = await createFormData(
        name,
        email,
        password,
        profileImage,
        selectedCategories
      );

      console.log(formData);
      const apiUrl = "http://13.209.65.4/user";

      try {
        const response = await axios.post(apiUrl, formData);
        if (response.data.code === "200") {
          alert(response.data.message);
          // TODO : 로그인 된 상태로 메인화면으로 이동
          window.location.href = "/";
        } else {
          console.log("회원가입 실패:", response.data.message);
        }
      } catch (error) {
        console.error("폼 제출 중 오류 발생:", error);
      }
    } else {
      // 필수 필드들이 모두 입력되지 않았을 경우
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
          <button onClick={handleVerification}>인증번호받기</button>
          <div>
            <p>{codeMessage}</p>
            {showVerificationForm && (
              <form onSubmit={handleSubmitVerificationCode}>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
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
