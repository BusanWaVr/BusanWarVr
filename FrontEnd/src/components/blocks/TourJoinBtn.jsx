import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@nextui-org/react";
import { PlayCircleFilled } from "@ant-design/icons";
import {
  setTourId,
  setTourUID,
  setYoutubeLink,
} from "../pages/LiveStream/LiveStreamReducer";

// 시작하기 버튼 컴포넌트
function TourJoinBtn({ Tour }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 리듀서에 저장
  useEffect(() => {
    dispatch(setTourUID(Tour.uid));
    dispatch(setTourId(Tour.tourId));
    dispatch(setYoutubeLink(Tour.link));
  }, [dispatch]);

  const handleStartClick = () => {
    navigate("../../../../livestream");
  };

  return (
    <Button
      className="mt-3 p-3 rounded-md w-full"
      color="primary"
      variant="solid"
      onClick={handleStartClick}
    >
      <PlayCircleFilled />
      투어 시청하기
    </Button>
  );
}

export default TourJoinBtn;
