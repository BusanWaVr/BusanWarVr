import React, { useEffect } from "react";
import { useOutletContext } from "react-router";
import TourCard from "../../blocks/TourCard";

function UserEndedBoard() {
  const { userTourData } = useOutletContext();

  if (!userTourData || !userTourData.endedTours) {
    return <div>Loading...</div>;
  }

  const userEndedData = userTourData.endedTours;

  useEffect(() => {
    console.log("종료보드에서 받고 있음", userEndedData);
  }, [userEndedData]);


  // userEndedData.isended = 1;

  const TourData = userEndedData;

  return (
    <div>
      <h1>종료보드</h1>
      <TourCard TourData={TourData} />
    </div>
  );
}

export default UserEndedBoard;
