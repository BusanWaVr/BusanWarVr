// src/store/reducers/index.ts

import { combineReducers } from "redux";
// 각 리듀서를 불러옵니다.
import liveStreamReducer from "../../components/pages/LiveStream/LiveStreamReducer";
import userInfoReducer from "./UserInfoReducer";

const rootReducer = combineReducers({
  liveStream: liveStreamReducer,
  userInfo: userInfoReducer,
});

export default rootReducer;
