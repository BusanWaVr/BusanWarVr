import React, { useEffect } from "react";
import TourCard from "../../blocks/TourCard";

function UserEndedBoard({ userTourData, isMe }) {

  if (!userTourData || !userTourData.endedTours) {
    return <div>Loading...</div>;
  }

  const userEndedData = userTourData.endedTours;

  // userEndedData.isended = 1;

  const TourData = userEndedData;

  return (
    <div>
      <h1>종료보드</h1>
      <TourCard TourData={TourData} isMe={isMe} />
    </div>
  );
}

export default UserEndedBoard;
