import React from "react";
import { useNavigate } from "react-router-dom";

// 시작하기 버튼 컴포넌트
function TourStartBtn({ Tour }) {
  const navigate = useNavigate();
  const tourUID = Tour.uid;
  const tourId = Tour.tourId;

  const handleStartClick = () => {
    navigate("../../../../livestream", {
      state: { tourUID: tourUID, tourId: tourId },
    });
    console.log(Tour);
  };

  return (
    <div>
      <button onClick={handleStartClick}>시작하기</button>
    </div>
  );
}

export default TourStartBtn;
