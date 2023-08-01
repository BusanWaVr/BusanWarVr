import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfoState {
  userId: string;
  nickname: string;
  email: string;
  profileImg: string;
  accessToken: string | null;
  refreshToken: string | null;
  userType: string | null;
}

const userId = localStorage.getItem("userId");
const nickname = localStorage.getItem("nickname");
const email = localStorage.getItem("email");
const profileImg = localStorage.getItem("profileImg");
const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");
const userType = localStorage.getItem("userType");

const initialState: UserInfoState = {
  userId: userId ? userId : "",
  nickname: nickname ? nickname : `부기${Math.floor(Math.random() * 100)}`,
  email: email ? email : "",
  profileImg: profileImg ? profileImg : "",
  accessToken: accessToken ? accessToken : null,
  refreshToken: refreshToken ? refreshToken : null,
  userType: userType ? userType : null,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
      localStorage.setItem("userId", state.userId);
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
      localStorage.setItem("email", state.email);
    },
    setUserType(state, action: PayloadAction<string>) {
      state.userType = action.payload;
      localStorage.setItem("userType", state.userType);
    },
    changeNickname(state, action: PayloadAction<string>) {
      state.nickname = action.payload;
      localStorage.setItem("nickname", state.nickname);
    },
    changeProfileImg(state, action: PayloadAction<string>) {
      state.profileImg = action.payload;
      localStorage.setItem("profileImg", state.profileImg);
    },
    changeAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
      localStorage.setItem("accessToken", state.accessToken);
    },
    changeRefreshToken(state, action: PayloadAction<string>) {
      state.refreshToken = action.payload;
      localStorage.setItem("refreshToken", state.refreshToken);
    },
  },
});

export const {
  setUserId,
  setEmail,
  setUserType,
  changeNickname,
  changeProfileImg,
  changeAccessToken,
  changeRefreshToken,
} = userInfoSlice.actions;
export default userInfoSlice.reducer;
