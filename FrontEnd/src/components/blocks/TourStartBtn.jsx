import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setTourId,
  setTourUID,
} from "../pages/LiveStream/LiveStreamReducer";


// 가이드의 투어시작하기 버튼 컴포넌트
function TourStartBtn({ Tour }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 리듀서에 저장
  useEffect(() => {
    dispatch(setTourUID(Tour.uid))
    dispatch(setTourId(Tour.tourId))
  }, [dispatch]);

  const handleStartClick = () => {
    navigate("../../../../livestream")
  };

  return (
    <div>
      <button onClick={handleStartClick}>방송 시작하기</button>
    </div>
  );
}

export default TourStartBtn;
