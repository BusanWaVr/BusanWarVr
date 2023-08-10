import React from "react";
import { useNavigate } from "react-router-dom";

// 시작하기 버튼 컴포넌트
function TourJoinBtn({ Tour }) {
  const navigate = useNavigate();
  const tourUID = Tour.uid;
  const tourId = Tour.tourId;
  const livelink = Tour.link;

  const handleStartClick = () => {
    navigate("../../../../livestream", {
      state: { tourUID: tourUID, tourId: tourId, livelink: livelink },
    });
    console.log(Tour);
    console.log(livelink);
  };
  console.log("시작하기", Tour);

  return (
    <div>
      <button onClick={handleStartClick}>투어 시청하기</button>
    </div>
  );
}

export default TourJoinBtn;
