import React, { useEffect } from "react";
import { useOutletContext } from "react-router";
import TourCard from "../../blocks/TourCard";

function UserCanceledBoard() {
  const { userTourData } = useOutletContext();

  if (!userTourData || !userTourData.canceledTours) {
    return <div>Loading...</div>;
  }

  const userCanceledData = userTourData.canceledTours;

  useEffect(() => {
    console.log("취소보드에서 받고 있음", userCanceledData);
  }, [userCanceledData]);

  const TourData = userCanceledData;

  return (
    <div>
      <h1>취소보드</h1>
      <TourCard TourData={TourData} />
    </div>
  );
}

export default UserCanceledBoard;
