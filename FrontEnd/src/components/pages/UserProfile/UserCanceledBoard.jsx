import React, { useEffect } from "react";
import { useOutletContext } from "react-router";
import TourCard from "../../blocks/TourCard";

function UserCanceledBoard({ userTourData }) {

  if (!userTourData || !userTourData.canceledTours) {
    return <div>Loading...</div>;
  }

  const userCanceledData = userTourData.canceledTours;

  const TourData = userCanceledData;

  return (
    <div>
      <h1>취소보드</h1>
      <TourCard TourData={TourData} />
    </div>
  );
}

export default UserCanceledBoard;
