import React, { useEffect } from "react";
import { useOutletContext } from "react-router";
import TourCard from "../../blocks/TourCard";

function UserScheduledBoard() {
  const { userTourData } = useOutletContext();

  if (!userTourData || !userTourData.scheduledTours) {
    return <div>Loading...</div>;
  }

  const userScheduledData = userTourData.scheduledTours;

  useEffect(() => {
    console.log("예정보드에서 받고 있음", userScheduledData);
  }, [userScheduledData]);

  const TourData = userScheduledData;

  return (
    <div>
      <h1>예정보드</h1>
      <TourCard TourData={TourData} />
    </div>
  );
}

export default UserScheduledBoard;
