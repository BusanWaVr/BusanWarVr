// src/store/reducers/index.ts

import { combineReducers } from "redux";
// 각 리듀서를 불러옵니다.
import counterReducer from "../../components/pages/Home/counterReducer";
import liveStreamReducer from "../../components/pages/LiveStream/LiveStreamReducer";
import userInfoReducer from "./UserInfoReducer";
import TourCourseReducer from "../../components/pages/Tour/TourCourseReducer";
import wishlistReducer from "./wishlistReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  liveStream: liveStreamReducer,
  userInfo: userInfoReducer,
  tourCourse: TourCourseReducer,
  wishlist: wishlistReducer,
});

export default rootReducer;
