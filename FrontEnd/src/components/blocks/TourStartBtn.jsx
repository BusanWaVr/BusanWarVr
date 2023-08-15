import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@nextui-org/react";
import { setTourId, setTourUID } from "../pages/LiveStream/LiveStreamReducer";
import { useI18n } from "../../hooks/useI18n"

// 가이드의 투어시작하기 버튼 컴포넌트
function TourStartBtn({ Tour }) {
  const t = useI18n()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 리듀서에 저장
  useEffect(() => {
    dispatch(setTourUID(Tour.uid));
    dispatch(setTourId(Tour.tourId));
  }, [dispatch]);

  const handleStartClick = () => {
    navigate("../../../../livestream");
  };

  return (
    <>
      <Button
        className="mt-3 bg-blue-50 p-3 rounded-md w-full"
        color="primary"
        variant="flat"
        onClick={handleStartClick}
      >
        
        {t(`방송 시작하기`)}
      </Button>
    </>
  );
}

export default TourStartBtn;
