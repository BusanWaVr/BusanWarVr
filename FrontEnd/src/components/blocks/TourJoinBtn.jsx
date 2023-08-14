import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setTourId,
  setTourUID,
} from "../pages/LiveStream/LiveStreamReducer";

// 시작하기 버튼 컴포넌트
function TourJoinBtn({ Tour }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 리듀서에 저장
  useEffect(() => {
    dispatch(setTourUID(Tour.uid))
    dispatch(setTourId(Tour.tourId))
  }, [dispatch]);

  const handleStartClick = () => {
    navigate("../../../../livestream");
  };
  console.log("시작하기", Tour);

  return (
    <div>
      <button onClick={handleStartClick}>투어 시청하기</button>
    </div>
  );
}

export default TourJoinBtn;
