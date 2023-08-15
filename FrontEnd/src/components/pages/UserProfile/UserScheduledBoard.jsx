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
      <TourCard TourData={TourData} isMe={isMe} tourType="scheduled"/>
    </div>
  );
}

export default UserScheduledBoard;
