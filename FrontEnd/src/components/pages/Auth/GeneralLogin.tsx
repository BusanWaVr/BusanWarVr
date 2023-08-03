import styled from "styled-components";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setUserId,
  setEmail,
  setUserType,
  setWishTour,
  changeNickname,
  changeProfileImg,
  changeAccessToken,
  changeRefreshToken,
} from "../../../store/reducers/UserInfoReducer";

const GeneralLoginWrapper = styled.div`
  /* Add your styling for the general login form wrapper */
`;

const LoginInputLabel = styled.label`
  width: 100%;
  text-align: left;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 5px;
`;

const LoginInput = styled.input`
  display: block;
  width: 100%;
  height: 45px;
  border-radius: 15px;
  padding: 0 10px;
  margin-bottom: 35px;
  font-size: 12px;
  border: 1px solid #ccc;
`;

const LoginButton = styled.button`
  display: block;
  width: 100%;
  height: 45px;
  border-radius: 15px;
  background-color: #7f9dff;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  &:hover {
    background-color: #698cff;
  }
`;

interface Props {
  setOnLoginModal: any;
  setIsLoggedIn: any;
}

function GeneralLogin({ setOnLoginModal, setIsLoggedIn }: Props) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // 로그인 요청을 서버에 보내고 JWT 토큰을 받아옴
      const response = await fetch("http://52.79.93.203/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Login failed.");
      }

      const res = await response.json();
      const accessToken = res.data.access_Token;
      const refreshToken = res.data.refresh_Token;
      const userId = res.data.userId;
      const email = res.data.email;
      const nickname = res.data.nickname;
      const profileImg = res.data.profileImg;
      const userType = res.data.type;

      console.log(res.data);
      // 받아온 JWT 토큰들을 로컬 스토리지에 저장
      dispatch(changeAccessToken(accessToken));
      dispatch(changeRefreshToken(refreshToken));
      dispatch(setUserId(userId));
      dispatch(setEmail(email));
      dispatch(setUserType(userType));
      dispatch(changeNickname(nickname));
      dispatch(changeProfileImg(profileImg));

      console.log(localStorage);

      // 로그인이 성공유무
      console.log("Login successful");
      setOnLoginModal(false);
      setIsLoggedIn(true);

      try {
        const response = await fetch("http://52.79.93.203/user/wish", {
          method: "GET",
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        const wishTour = data.data.wishTours.map((tour) => tour.tourId);
        dispatch(setWishTour(JSON.stringify(wishTour)));
        navigate("/dashboard"); // 성공시 Dashboard 페이지로 이동
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <GeneralLoginWrapper>
      <form action="" id="loginForm" onSubmit={handleSubmit}>
        <div className="login-form__input-group">
          <LoginInputLabel htmlFor="email">이메일</LoginInputLabel>
          <LoginInput
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="이메일 주소 ex) busanvr@busanvr.co.kr"
            className="login-form__input-id"
          />
          <LoginInputLabel htmlFor="password">비밀번호</LoginInputLabel>
          <LoginInput
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="영문,숫자,특수문자(!,@,#,$,%) 2종류 포함 10자리 이상"
            className="login-form__input-pwd"
          />
        </div>
        <LoginButton type="submit" className="login-form__submit-btn">
          로그인
        </LoginButton>
      </form>
    </GeneralLoginWrapper>
  );
}

export default GeneralLogin;
