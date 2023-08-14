import React, { useEffect } from "react";
import { useOutletContext } from "react-router";
import TourCard from "../../blocks/TourCard";

function UserScheduledBoard({ userTourData, isMe }) {

  if (!userTourData || !userTourData.scheduledTours) {
    return <div>Loading...</div>;
  }

  const userScheduledData = userTourData.scheduledTours;


  const TourData = userScheduledData;

  return (
    <div>
      <h1>예정보드</h1>
      <TourCard TourData={TourData} isMe={isMe} />
    </div>
  );
}

export default UserScheduledBoard;
