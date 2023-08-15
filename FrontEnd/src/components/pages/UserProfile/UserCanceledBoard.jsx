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
      <TourCard TourData={TourData} tourType="canceled" />
    </div>
  );
}

export default UserCanceledBoard;
