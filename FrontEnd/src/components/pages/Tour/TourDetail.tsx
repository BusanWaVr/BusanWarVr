import React from "react";
import { useParams } from "react-router-dom";

const TourDetail: React.FC = () => {
  const { tourId } = useParams();
  return (
    <>
      <h1>{tourId}</h1>
    </>
  );
};

export default TourDetail;
